import comptence from "./documents/competence";
import employee from "./documents/employee";
import footer from "./documents/footer";
import form from "./documents/form";
import frontPage from "./documents/frontPage";
import header from "./documents/header";
import page from "./documents/page";
import settings from "./documents/settings";
import cta from "./global/cta";
import embedHTML from "./global/embedHTML";
import figure from "./global/figure";
import texteditor from "./global/texteditor";
import texteditorSimple from "./global/texteditorSimple";
import banner from "./sections/banner";
import hero from "./sections/hero";
import image from "./sections/image";

export const schemaTypes = [
  //Documents
  frontPage,
  page,
  settings,
  header,
  footer,
  comptence,
  employee,
  form,

  // Global objects
  embedHTML,
  texteditor,
  texteditorSimple,
  cta,
  figure,

  //Sections
  hero,
  image,
  banner,
];
