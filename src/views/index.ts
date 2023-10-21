import NavPages from "./NavPages";
import HiddenPages from "./HiddenPages";
import PageTemplates from "./PageTemplates";

const pages = Array(...NavPages.pages, ...HiddenPages.pages, ...PageTemplates.pages);

export default pages;