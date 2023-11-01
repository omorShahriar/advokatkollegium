import { Hero, RenderSections } from "components";
import React from "react";

export function FrontpageContent(props) {
  const { page, settings } = props;

  return (
    <React.Fragment>
      <Hero hero={page.hero} />
      {/* <RenderSections sections={page.content} settings={settings} /> */}
    </React.Fragment>
  );
}
