'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';
import type { MediaAsset } from '@/data/portfolio';
import { EvidenceImageDialog } from './EvidenceImageDialog';

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
  const [enlarged, setEnlarged] = useState<MediaAsset | null>(null);
  const openerRef = useRef<HTMLElement | null>(null);
  const open = (asset: MediaAsset, button: HTMLElement) => { openerRef.current = button; setEnlarged(asset); };
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
        <button
          type="button"
          className="research-evidence__frame research-evidence__frame--interface"
          onClick={(event) => open(interfaceAsset, event.currentTarget)}
          aria-label="Enlarge the sanitized Frozen Shoulder DSS interface capture"
        >
          <Image
            src={interfaceAsset.src}
            alt={interfaceAsset.alt}
            width={1769}
            height={889}
            sizes="(min-width: 1024px) 66vw, calc(100vw - 32px)"
          />
        </button>

        <div className="research-evidence__copy">
          <p className="evidence-index-label">01 / Working interface</p>
          <h3>Calibration gives each movement an explicit starting state.</h3>
          <p className="research-evidence__caption">{interfaceAsset.caption}</p>
          <button className="arrow-link evidence-open-link" type="button" onClick={(event) => open(interfaceAsset, event.currentTarget)}>Enlarge interface <span aria-hidden="true">↗</span></button>
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
          <button
            type="button"
            className="research-evidence__frame research-evidence__frame--report"
            onClick={(event) => open(reportAsset, event.currentTarget)}
            aria-label="Enlarge the simulated session report"
          >
            <Image
              src={reportAsset.src}
              alt={reportAsset.alt}
              width={1579}
              height={1543}
              sizes="(min-width: 1024px) 56vw, calc(100vw - 32px)"
            />
          </button>
          <div className="research-evidence__module-copy">
            <p className="evidence-index-label">02 / Reviewable output</p>
            <h3>A session becomes evidence someone can inspect.</h3>
            <p>{reportAsset.caption}</p>
            <button className="arrow-link evidence-open-link" type="button" onClick={(event) => open(reportAsset, event.currentTarget)}>Enlarge demonstration graph <span aria-hidden="true">↗</span></button>
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
        <button
          type="button"
          className="research-evidence__frame research-evidence__frame--context"
          onClick={(event) => open(fieldAsset, event.currentTarget)}
          aria-label="Enlarge the sanitized field prototype photograph"
        >
          <Image
            src={fieldAsset.src}
            alt={fieldAsset.alt}
            width={1448}
            height={1086}
            sizes="(min-width: 1024px) 42vw, calc(100vw - 32px)"
          />
        </button>
        <div className="research-evidence__copy">
          <p className="evidence-index-label">04 / Field context</p>
          <h3>Designed for ordinary laptop hardware, not a lab-only setup.</h3>
          <p>{fieldAsset.caption}</p>
        </div>
      </article>
      <EvidenceImageDialog asset={enlarged} onClose={() => setEnlarged(null)} returnFocusTo={openerRef} />
    </div>
  );
}
