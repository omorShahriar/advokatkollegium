import comptence from "./documents/competence";
import employee from "./documents/employee";
import footer from "./documents/footer";
import header from "./documents/header";
import page from "./documents/page";
import frontpage from "./documents/frontPage";
import settings from "./documents/settings";
import embedHTML from "./global/embedHTML";
import figure from "./global/figure";
import texteditor from "./global/texteditor";
import texteditorSimple from "./global/texteditorSimple";
import banner from "./sections/banner";
import hero from "./global/hero";
import richContent from "./sections/richContent";
import areaOfExpertise from "./sections/areaOfExpertise";
import lawyerPreview from "./sections/lawyerPreview";
import lawyerList from "./sections/lawyerList";
import link from "./global/link";
import metadata from "./global/metadata";
import publishSettings from "./global/publishSettings";
import textNormal from "./sections/textNormal";
import imageNormal from "./sections/imageNormal";
import displayForm from "./sections/displayForm";
import form from "./documents/form";

export const schemaTypes = [
  //Documents
  page,
  frontpage,
  comptence,
  employee,
  form,
  header,
  footer,
  settings,

  // Global objects
  embedHTML,
  texteditor,
  texteditorSimple,
  link,
  figure,
  publishSettings,
  metadata,
  hero,

  //Sections
  richContent,
  areaOfExpertise,
  lawyerPreview,
  lawyerList,
  displayForm,
  banner,
  textNormal,
  imageNormal,
];
