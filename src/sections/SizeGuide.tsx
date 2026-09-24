import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { m as motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { formatSize, sizeGuide, variantById, productHref } from "../data/catalog";
import { images } from "../generated/images";
import { imageProps } from "../lib/image";
import { navigateWithinPage } from "../lib/navigation";
import { track } from "../lib/telemetry";
import styles from "./SizeGuide.module.css";
const sizes = sizeGuide.map(size => ({...size, dimensions: formatSize(variantById(size.variantId))}));

export default function SizeGuide() {
  const [selected, setSelected] = useState("small");
  const reduceMotion = useReducedMotion();
  const selectedSize = sizes.find(size => size.id === selected) ?? sizes[0];
  const selectedProduct = variantById(selectedSize.variantId);

  return (
    <section id="guia-de-tamanhos" className={styles.section} aria-labelledby="size-guide-title">
      <div className={styles.container}>
        <div className={styles.main}>
          <div className={styles.content}>
            <header>
              <p className={styles.eyebrow}>Guia de tamanhos</p>
              <h2 id="size-guide-title" className={styles.title}>
                <span>Qual tapete</span>
                <span>é ideal para</span>
                <span>o seu pet?</span>
              </h2>
              <p className={styles.description}>
                Cada pet tem seu espaço e sua rotina. Encontre o tamanho de tapete
                que combina com o dia a dia do seu pet.
              </p>
            </header>

            <div className={styles.options} role="group" aria-label="Escolha o porte do seu pet">
              {sizes.map((size) => (
                <button
                  type="button"
                  key={size.id}
                  className={styles.option}
                  aria-pressed={selected === size.id}
                  aria-controls="size-guide-comparison"
                  onClick={() => {setSelected(size.id); track("size_select", {size: size.id});}}
                >
                  <span className={styles.optionLetter} aria-hidden="true">{size.letter}</span>
                  <span className={styles.optionText}>
                    <strong>{size.name}</strong>
                    <span>{size.dimensions}</span>
                  </span>
                  <CaretRight size={21} aria-hidden="true" />
                </button>
              ))}
            </div>
            <a className={styles.productLink} href={productHref(selectedProduct.lineId, selectedProduct.units)} onClick={navigateWithinPage}>Ver produto neste tamanho <CaretRight aria-hidden="true" size={16} /></a>
          </div>

          <motion.div
            id="size-guide-comparison"
            className={styles.comparison}
            role="group"
            aria-label="Compare os tamanhos dos tapetes"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: reduceMotion ? 0 : 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.art} aria-hidden="true">
              <span className={styles.bluePetal} />
              <span className={styles.mintPetal} />
              <span className={styles.smallPetal} />
            </div>
            <svg className={styles.guideLine} viewBox="0 0 1000 500" preserveAspectRatio="none" aria-hidden="true">
              <path d="M 95 380 C 320 425, 370 250, 560 265 S 770 90, 900 125" />
            </svg>
            {sizes.map((size) => (
              <button
                key={size.id}
                type="button"
                className={`${styles.dog} ${styles[size.id]}`}
                data-selected={selected === size.id}
                aria-pressed={selected === size.id}
                aria-label={`Destacar ${size.name.toLowerCase()}, ${size.dimensions}`}
                onClick={() => {setSelected(size.id); track("size_select", {size: size.id});}}
              >
                <span className={styles.dogLabel}>
                  <span className={styles.badge}>{size.letter}</span>
                  <strong>{size.dimensions}</strong>
                </span>
                <img {...imageProps(images[size.image], "auto, (max-width: 767px) 60vw, (max-width: 1023px) 33vw, 25vw")} alt={size.alt} loading="lazy" decoding="async" draggable={false} />
              </button>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
