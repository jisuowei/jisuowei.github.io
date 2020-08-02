import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWeibo, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowUp} from '@fortawesome/free-solid-svg-icons';

interface FAProps {
  icon: string
  className?: string
}

export default function FA(props: FAProps) {

  const { icon, className } = props;

  const iconMap: {[KEY: string]: any} = {
    weibo: faWeibo,
    github: faGithub,
    linkedin: faLinkedin,
    envelope: faEnvelope,
    arrowUp: faArrowUp,
  }

  return (
    <FontAwesomeIcon className={`${className}`} icon={iconMap[icon]} />
  )
}
