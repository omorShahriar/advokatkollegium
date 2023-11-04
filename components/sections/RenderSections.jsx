import React from "react";

import * as SectionComponents from "./index";

function upperFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function RenderSections(props) {
  const { sections, settings } = props;

  return (
    <React.Fragment>
      {sections?.map((section) => {
        const Section = SectionComponents[upperFirst(section._type)];
        if (!Section) return null;
        return <Section key={section._key} settings={settings} {...section} />;
      })}
    </React.Fragment>
  );
}
