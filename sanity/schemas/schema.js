import comptence from "./documents/competence";
import employee from "./documents/employee";
import footer from "./documents/footer";
import header from "./documents/header";
import page from "./documents/page";
import settings from "./documents/settings";
import embedHTML from "./global/embedHTML";
import figure from "./global/figure";
import texteditor from "./global/texteditor";
import texteditorSimple from "./global/texteditorSimple";
import banner from "./sections/banner";
import hero from "./sections/hero";
import image from "./sections/image";
import richContent from "./sections/richContent";
import areaOfExpertise from "./sections/areaOfExpertise";
import lawyerPreview from "./sections/lawyerPreview";
import lawyerList from "./sections/lawyerList";
import link from "./global/link";
import metadata from "./global/metadata";
import publishSettings from "./global/publishSettings";
import normalText from "./sections/normalText";
import normalImage from "./sections/normalImage";
import displayForm from "./sections/displayForm";
import form from "./documents/form";
import frontpage from "./documents/frontPage";

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

  //Sections
  richContent,
  areaOfExpertise,
  lawyerPreview,
  lawyerList,
  displayForm,
  hero,
  image,
  banner,
  normalText,
  normalImage,
];
