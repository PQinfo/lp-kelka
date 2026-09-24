import { useEffect, useRef, type FormEvent } from "react";
import { m as motion, AnimatePresence } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { ArrowRight, ArrowLeft, CaretRight, ChartBar, Check, GearSix, ShoppingCart, WhatsappLogo } from "@phosphor-icons/react";
import { flows } from "../data/simulator";
import { stats } from "../data/content";
import { cta, whatsappUrl } from "../data/site";
import StateMapIcon from "../components/StateMapIcon";
import { images } from "../generated/images";
import { imageProps } from "../lib/image";
import { useSimulator } from "../hooks/useSimulator";
import { useLocationSearch } from "../hooks/useLocationSearch";
import { track } from "../lib/telemetry";
import type { FlowId, InterestId, SimulatorAction } from "../lib/simulator";
import styles from "./CTA.module.css";

const interests = [
  { id: "comprar", title: "Quero comprar", description: "Encontre o tapete ideal para o seu pet", icon: ShoppingCart, flowId: "consumidor" },
  { id: "revender", title: "Quero revender", description: "Leve os produtos Kelka para a sua região", icon: ChartBar, flowId: null },
  { id: "terceirizar", title: "Quero terceirizar", description: "Produção sob medida para a sua marca", icon: GearSix, flowId: "marca_propria" },
] as const;

const resaleProfiles = [
  { flowId: "revendedor", title: "Tenho uma loja ou pet shop", description: "Compre produtos para revender no seu negócio" },
  { flowId: "distribuidor", title: "Quero ser distribuidor", description: "Distribua os produtos Kelka na sua região" },
  { flowId: "representante", title: "Quero ser representante", description: "Conecte sua carteira de clientes à Kelka" },
] as const;

export default function CTA() {
  const reduce = useReducedMotion();
  const { phase, interestId, flowId, stepIndex, selections, labels, dispatch, currentFlow, currentStep, canContinue } = useSimulator();
  const questionRef = useRef<HTMLHeadingElement>(null);
  const focusNextScreen = useRef(false);
  const transitioning = useRef(false);
  const search = useLocationSearch();
  useEffect(() => {
    const id = new URLSearchParams(search).get("interesse");
    if (id === "comprar" || id === "revender" || id === "terceirizar") dispatch({type: "interest", id});
  }, [search, dispatch]);
  const isStateStep = currentStep?.field === "estado";
  const preliminarySteps = interestId === "revender" ? 2 : 1;
  const totalSteps = currentFlow ? currentFlow.steps.length + preliminarySteps : null;
  const stepNumber = phase === "interest" ? 1 : phase === "profile" ? 2 : stepIndex + preliminarySteps + 1;
  const progress = phase === "result" ? 1 : totalSteps ? stepNumber / totalSteps : phase === "profile" ? 0.3 : 0.18;
  const screenKey = phase === "steps" ? `${flowId}-${stepIndex}` : phase;
  const currentValue = currentStep ? selections[currentStep.field] : undefined;
  const title = phase === "interest" ? "Qual é o seu interesse?" : phase === "profile" ? "Qual é o seu perfil?" : phase === "result" ? "Vamos conversar?" : currentStep?.question;
  const subtitle = phase === "interest" ? "Toque em uma opção para avançar." : phase === "profile" ? "Escolha seu perfil para avançar." : phase === "result" ? "Confira suas respostas e fale com a nossa equipe." : currentStep?.multiSelect ? "Selecione os segmentos e toque em Ver resumo." : "Toque em uma opção para avançar.";

  function beginTransition() {
    if (transitioning.current) return false;
    transitioning.current = true;
    focusNextScreen.current = true;
    return true;
  }
  function advance(action: SimulatorAction) {
    if (!beginTransition()) return;
    if (action.type === "interest") track("simulator_start", {interest: action.id});
    else if (phase === "steps" && currentFlow && stepIndex === currentFlow.steps.length - 1) track("simulator_complete", {flow: currentFlow.id});
    else track("simulator_step", {flow: flowId ?? "", step: stepIndex});
    dispatch(action);
  }
  function chooseInterest(id: InterestId) { advance({type: "interest", id, advance: true}); }
  function chooseProfile(id: FlowId) { advance({type: "profile", id, advance: true}); }
  function chooseAnswer(value: string) {
    if (transitioning.current) return;
    if (currentStep?.multiSelect) dispatch({type: "answer", value});
    else advance({type: "answer", value, advance: true});
  }
  function confirmSelection(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (phase === "steps" && currentStep?.multiSelect && canContinue) advance({type: "next"});
  }
  function goBack() { if (beginTransition()) dispatch({type: "back"}); }
  function restart() { if (beginTransition()) dispatch({type: "reset"}); }

  return (
    <section id="contato" className={styles.section} aria-labelledby="contact-title">
      <img {...imageProps(images.simulator, "100vw")} alt="" aria-hidden="true" loading="lazy" decoding="async" className={styles.backgroundFill} />
      <img {...imageProps(images.simulator, "100vw")} alt="" aria-hidden="true" loading="lazy" decoding="async" className={styles.background} />
      <div className={styles.container}>
        <div className={styles.intro}>
          <p className={styles.eyebrow}>Atendimento especializado<span aria-hidden="true" /></p>
          <h2 id="contact-title">Vamos conversar{" "}<br />sobre o que você precisa</h2>
          <p className={styles.description}>Quer comprar tapetes para o seu pet, revender nossos produtos ou produzir com a sua marca? Nossa equipe agiliza o contato com o consultor que pode ajudar você.</p>
          <dl className={styles.stats}>
            {stats.map((stat) => (
              <div key={stat.label}>
                <dt>{stat.label}</dt>
                <dd><span className={styles.statValue}>{stat.format(stat.target)}</span></dd>
              </div>
            ))}
          </dl>
        </div>

        <form className={`${styles.panel} requires-js`} onSubmit={confirmSelection} aria-label="Simulador de atendimento Kelka">
          <div className={styles.progress}>
            <span className={styles.progressTrack} aria-hidden="true">
              <motion.span animate={{ scaleX: progress }} transition={{ duration: reduce ? 0 : 0.3 }} />
            </span>
            <p aria-live="polite">{phase === "result" ? "Tudo pronto" : `Passo ${stepNumber}${totalSteps && phase === "steps" ? ` de ${totalSteps}` : ""}`}</p>
          </div>

          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={screenKey}
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : 10 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: reduce ? 0 : -10 },
              }}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{ duration: reduce ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
              onAnimationComplete={(definition) => {
                if (definition === "visible") {
                  transitioning.current = false;
                  if (focusNextScreen.current) {
                    questionRef.current?.focus({ preventScroll: true });
                    questionRef.current?.scrollIntoView({ block: "nearest", behavior: reduce ? "instant" : "smooth" });
                    focusNextScreen.current = false;
                  }
                }
              }}
            >
              <h3 id="simulator-question" ref={questionRef} tabIndex={-1} className={styles.question}>{title}</h3>
              <p className={styles.subtitle}>{subtitle}</p>

              {phase === "interest" && (
                <fieldset className={styles.options} aria-labelledby="simulator-question">
                  {interests.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button key={item.id} type="button" className={styles.interestOption} data-selected={interestId === item.id} aria-pressed={interestId === item.id} onClick={() => chooseInterest(item.id)}>
                        <span className={styles.optionIcon}><Icon size={28} weight="regular" aria-hidden="true" /></span>
                        <span className={styles.optionText}><strong>{item.title}</strong><span>{item.description}</span></span>
                        <CaretRight size={20} weight="bold" className={styles.caret} aria-hidden="true" />
                      </button>
                    );
                  })}
                </fieldset>
              )}

              {phase === "profile" && (
                <fieldset className={styles.options} aria-labelledby="simulator-question">
                  {resaleProfiles.map((profile) => {
                    const Icon = flows.find((flow) => flow.id === profile.flowId)!.icon;
                    return (
                      <button key={profile.flowId} type="button" className={styles.interestOption} data-selected={flowId === profile.flowId} aria-pressed={flowId === profile.flowId} onClick={() => chooseProfile(profile.flowId)}>
                        <span className={styles.optionIcon}><Icon size={28} aria-hidden="true" /></span>
                        <span className={styles.optionText}><strong>{profile.title}</strong><span>{profile.description}</span></span>
                        <CaretRight size={20} weight="bold" className={styles.caret} aria-hidden="true" />
                      </button>
                    );
                  })}
                </fieldset>
              )}

              {phase === "steps" && currentStep && (
                <fieldset className={styles.answerOptions} aria-labelledby="simulator-question">
                  {currentStep.options.map((option) => {
                    const checked = Array.isArray(currentValue) ? currentValue.includes(option.value) : currentValue === option.value;
                    const className = `${styles.answerOption}${isStateStep ? ` ${styles.stateAnswer}` : ""}`;
                    const content = <>
                      {isStateStep && <StateMapIcon state={option.value} className={styles.stateMap} />}
                      <span className={styles.choiceMark} aria-hidden="true">{checked && !isStateStep && <Check size={12} weight="bold" />}</span>
                      <span>{option.label}</span>
                    </>;
                    return currentStep.multiSelect ? (
                      <label key={option.value} className={className}>
                        <input type="checkbox" name={currentStep.field} value={option.value} checked={checked} onChange={() => chooseAnswer(option.value)} />
                        {content}
                      </label>
                    ) : (
                      <button key={option.value} type="button" className={className} data-selected={checked} aria-pressed={checked} onClick={() => chooseAnswer(option.value)}>
                        {content}
                      </button>
                    );
                  })}
                </fieldset>
              )}

              {phase === "result" && currentFlow && (
                <dl className={styles.summary}>
                  <div><dt>Seu interesse</dt><dd>{currentFlow.label}</dd></div>
                  {currentFlow.steps.map((step) => {
                    const value = labels[step.field];
                    return <div key={step.field}><dt>{step.question}</dt><dd>{Array.isArray(value) ? value.join(", ") : value}</dd></div>;
                  })}
                </dl>
              )}

              {phase !== "interest" && <div className={styles.actions}>
                {phase === "result" && currentFlow ? (
                  <a href={whatsappUrl(currentFlow.buildMessage(labels))} target="_blank" rel="noopener noreferrer" onClick={() => track("contact_click", {source: "simulator", flow: currentFlow.id})} className={styles.primaryButton}>
                    <WhatsappLogo size={22} aria-hidden="true" />{cta.whatsapp}<ArrowRight size={20} aria-hidden="true" />
                  </a>
                ) : phase === "steps" && currentStep?.multiSelect ? (
                  <button type="submit" disabled={!canContinue} className={styles.primaryButton}>Ver resumo<ArrowRight size={20} aria-hidden="true" /></button>
                ) : null}
                <div className={styles.secondaryActions}>
                  <button type="button" onClick={goBack}><ArrowLeft size={16} aria-hidden="true" />Voltar</button>
                  {phase === "result" && <button type="button" onClick={restart}>Recomeçar</button>}
                </div>
              </div>}
            </motion.div>
          </AnimatePresence>

          <p className={styles.whatsappNote}>
            <WhatsappLogo size={27} aria-hidden="true" />
            <span>Preencha as etapas e envie sua mensagem diretamente pelo WhatsApp.</span>
          </p>
        </form>
        <noscript><div className={styles.panel}><h3 className={styles.question}>Fale com a nossa equipe</h3><p className={styles.subtitle}>Conte o que você precisa e receba atendimento pelo WhatsApp.</p><a className={styles.primaryButton} href={whatsappUrl("Olá! Gostaria de falar com a equipe Kelka.")}>Falar no WhatsApp</a></div></noscript>
      </div>
    </section>
  );
}
