import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { CaretLeft, CaretRight, Quotes } from "@phosphor-icons/react";
import { testimonials, type Testimonial } from "../data/content";
import styles from "./Testimonials.module.css";

function Review({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className={styles.review}>
      <Quotes size={34} weight="fill" className={styles.quoteMark} aria-hidden="true" />
      <blockquote>“{testimonial.text}”</blockquote>
      <figcaption className={styles.author}>
        <span className={styles.avatar} aria-hidden="true">{testimonial.initial}</span>
        <span className={styles.authorDetails}>
          <strong>{testimonial.name}</strong>
          <span>{testimonial.city}</span>
          <span>{testimonial.pet}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export default function Testimonials() {
  const reduce = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const active = testimonials[activeIndex];

  function move(step: number) {
    setDirection(step);
    setActiveIndex((index) => (index + step + testimonials.length) % testimonials.length);
  }

  function select(index: number) {
    setDirection(index >= activeIndex ? 1 : -1);
    setActiveIndex(index);
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      move(event.key === "ArrowRight" ? 1 : -1);
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      select(event.key === "Home" ? 0 : testimonials.length - 1);
    }
  }

  return (
    <section id="depoimentos" className={styles.section} aria-labelledby="testimonials-title">
      <div className={styles.scene}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h2 id="testimonials-title">Quem usa, <span>aprova</span></h2>
            <p className={styles.subtitle}>O cuidado da Kelka no dia a dia de quem tem pet.</p>
          </header>

          <div
            className={styles.carousel}
            role="region"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            tabIndex={0}
            onKeyDown={handleKeyDown}
          >
            <button className={`${styles.arrow} ${styles.previous}`} type="button" onClick={() => move(-1)} aria-label="Avaliação anterior" aria-controls="active-review">
              <CaretLeft size={25} weight="bold" aria-hidden="true" />
            </button>

            <div className={styles.stack}>
              <div className={styles.backCards} aria-hidden="true"><span /><span /><span /></div>
              <div id="active-review" className={styles.activeReview}>
                <AnimatePresence initial={false} mode="wait" custom={direction}>
                  <motion.div
                    key={active.name}
                    className={styles.card}
                    custom={direction}
                    variants={{
                      enter: (step: number) => ({ opacity: 0, x: reduce ? 0 : step * 36, rotate: reduce ? 0 : step * 1.5 }),
                      center: { opacity: 1, x: 0, rotate: 0 },
                      exit: (step: number) => ({ opacity: 0, x: reduce ? 0 : step * -36, rotate: reduce ? 0 : step * -1.5 }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: reduce ? 0 : 0.22, ease: [0.16, 1, 0.3, 1] }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.12}
                    onDragEnd={(_, info) => {
                      if (Math.abs(info.offset.x) > 45 || Math.abs(info.velocity.x) > 400) move(info.offset.x < 0 ? 1 : -1);
                    }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Avaliação ${activeIndex + 1} de ${testimonials.length}`}
                  >
                    <Review testimonial={active} />
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <button className={`${styles.arrow} ${styles.next}`} type="button" onClick={() => move(1)} aria-label="Próxima avaliação" aria-controls="active-review">
              <CaretRight size={25} weight="bold" aria-hidden="true" />
            </button>

            <div className={styles.pagination} aria-label="Escolher avaliação">
              {testimonials.map((testimonial, index) => (
                <button
                  key={testimonial.name}
                  type="button"
                  onClick={() => select(index)}
                  aria-label={`Ver avaliação de ${testimonial.name}`}
                  aria-current={index === activeIndex ? "true" : undefined}
                  aria-controls="active-review"
                ><span /></button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite" aria-atomic="true">Avaliação {activeIndex + 1} de {testimonials.length}. {active.name}: {active.text}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
