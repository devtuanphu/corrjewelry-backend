import { registerField } from "@strapi/helper-plugin";
import CascadingDropdown from "./components/CascadingDropdown";

registerField("cascading-dropdown", CascadingDropdown);
