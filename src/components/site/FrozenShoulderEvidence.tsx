import Image from 'next/image';
import type { MediaAsset } from '@/data/portfolio';

interface FrozenShoulderEvidenceProps {
  assets: MediaAsset[];
}

const pipelineSteps = [
  {
    title: 'Capture the frame',
    description: 'Read the camera input and estimate shoulder, elbow, and wrist landmarks.',
  },
  {
    title: 'Check reliability',
    description: 'Reject unstable observations before they influence movement feedback.',
  },
  {
    title: 'Calculate geometry',
    description: 'Translate usable landmarks into joint angles and range-of-motion observations.',
  },
  {
    title: 'Update movement state',
    description: 'Track repetitions, exercise state, and compensation patterns over time.',
  },
  {
    title: 'Build the session record',
    description: 'Organize the accepted observations into reviewable reporting output.',
  },
];

export function FrozenShoulderEvidence({ assets }: FrozenShoulderEvidenceProps) {
  const interfaceAsset = assets.find((asset) => asset.id === 'frozen-interface');
  const reportAsset = assets.find((asset) => asset.id === 'frozen-session-report');
  const fieldAsset = assets.find((asset) => asset.id === 'frozen-field-context');

  if (!interfaceAsset || !reportAsset || !fieldAsset) return null;

  return (
    <div className="research-evidence">
      <div className="case-showcase__intro">
        <p className="eyebrow">Showcase</p>
        <h2>From movement capture to reviewable session evidence.</h2>
        <p>
          Three views show the working system, the checks behind its feedback, and the output a person can inspect.
        </p>
      </div>

      <article className="research-evidence__primary">
        <a
          className="research-evidence__frame research-evidence__frame--interface"
          href={interfaceAsset.src}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the sanitized Frozen Shoulder DSS interface capture at full size"
        >
          <Image
            src={interfaceAsset.src}
            alt={interfaceAsset.alt}
            width={1769}
            height={889}
            sizes="(min-width: 1024px) 66vw, calc(100vw - 32px)"
          />
        </a>

        <div className="research-evidence__copy">
          <p className="evidence-index-label">01 / Working interface</p>
          <h3>Calibration gives each movement an explicit starting state.</h3>
          <p>{interfaceAsset.caption}</p>
          <dl className="research-evidence__facts">
            <div>
              <dt>Observe</dt>
              <dd>Pose landmarks and joint position</dd>
            </div>
            <div>
              <dt>Check</dt>
              <dd>Calibration and landmark reliability</dd>
            </div>
            <div>
              <dt>Track</dt>
              <dd>Exercise state and session feedback</dd>
            </div>
          </dl>
        </div>
      </article>

      <div className="research-evidence__supporting">
        <article className="research-evidence__report">
          <a
            className="research-evidence__frame research-evidence__frame--report"
            href={reportAsset.src}
            target="_blank"
            rel="noreferrer"
            aria-label="Open the simulated session report at full size"
          >
            <Image
              src={reportAsset.src}
              alt={reportAsset.alt}
              width={1579}
              height={1543}
              sizes="(min-width: 1024px) 56vw, calc(100vw - 32px)"
            />
          </a>
          <div className="research-evidence__module-copy">
            <p className="evidence-index-label">02 / Reviewable output</p>
            <h3>A session becomes evidence someone can inspect.</h3>
            <p>{reportAsset.caption}</p>
            <a className="arrow-link" href={reportAsset.src} target="_blank" rel="noreferrer">
              Open full demonstration graph <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>

        <article className="research-evidence__process">
          <div className="research-evidence__module-copy">
            <p className="evidence-index-label">03 / Processing logic</p>
            <h3>Feedback is produced through a sequence of explicit checks.</h3>
            <p>The pipeline separates a detected pose from a movement observation that is stable enough to record.</p>
          </div>
          <ol className="research-evidence__pipeline" aria-label="Pose-processing pipeline">
            {pipelineSteps.map((step) => (
              <li key={step.title}>
                <span aria-hidden="true" />
                <div>
                  <strong>{step.title}</strong>
                  <p>{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </article>
      </div>

      <article className="research-evidence__context">
        <a
          className="research-evidence__frame research-evidence__frame--context"
          href={fieldAsset.src}
          target="_blank"
          rel="noreferrer"
          aria-label="Open the sanitized field prototype photograph at full size"
        >
          <Image
            src={fieldAsset.src}
            alt={fieldAsset.alt}
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 42vw, calc(100vw - 32px)"
          />
        </a>
        <div className="research-evidence__copy">
          <p className="evidence-index-label">04 / Field context</p>
          <h3>Designed for ordinary laptop hardware, not a lab-only setup.</h3>
          <p>{fieldAsset.caption}</p>
        </div>
      </article>
    </div>
  );
}
