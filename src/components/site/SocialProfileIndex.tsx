import { FaFacebook, FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa6';
import type { SocialPlatform, SocialProfile } from '@/data/portfolio';

const profileIcons: Record<SocialPlatform, typeof FaGithub> = {
  linkedin: FaLinkedin,
  github: FaGithub,
  instagram: FaInstagram,
  facebook: FaFacebook,
};

interface SocialProfileIndexProps {
  profiles: SocialProfile[];
}

export function SocialProfileIndex({ profiles }: SocialProfileIndexProps) {
  return (
    <nav className="elsewhere" aria-labelledby="elsewhere-title">
      <div className="elsewhere__heading">
        <p id="elsewhere-title" className="eyebrow">Elsewhere</p>
        <p>More places to see my work or connect.</p>
      </div>
      <div className="social-links">
        {profiles.map((profile) => {
          const Icon = profileIcons[profile.platform];

          return (
            <a key={profile.platform} href={profile.href} target="_blank" rel="noreferrer noopener">
              <Icon className="social-links__icon" aria-hidden="true" focusable="false" />
              <span>
                <strong>{profile.label}</strong>
                <small>{profile.handle}</small>
              </span>
              <span className="social-links__arrow" aria-hidden="true">↗</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
