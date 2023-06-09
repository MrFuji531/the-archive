import React from 'react';
import './PageSection.css';

// eslint-disable-next-line react/prop-types
const PageSection = ({title, children, backgroundColor}) => {
  return (
    <section className="page-section" style={{backgroundColor}}>
      {title && <h2 className="section-title">{title}</h2>}
      {children}
    </section>
  );
};

export default PageSection;
