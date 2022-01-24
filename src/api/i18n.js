const i18n = new Map();

export const stringsToTranslate = [
   "A chance for many researchers to work simultaneously and independently",
   "A possibility to automatically check for errors in the processed data",
   "About",
   "Accept",
   "Accept Contributions",
   "Action",
   "Actions",
   "Activate",
   "Activate / Deactivate",
   "Add",
   "Add Translation",
   "Add all markers of the groups to which this marker belongs to the group",
   "Add connection",
   "Add dictionaries of other language groups",
   "Add field",
   "Add lexical entry",
   "Add link",
   "Add marker to group",
   "Add new column",
   "Add new translation gist",
   "Add news",
   "Add one or more perspectives",
   "Add one or more translations",
   "Add perspective",
   "Add to markup",
   "Add variant",
   "Administrators",
   "All",
   "An option to create results of intellectual activity (RIAs) for the needs of writing reports and working with data",
   "an option to save the online map one has created as a link, and its automatic update when adding new materials to LingvoDoc",
   "and",
   "Archive",
   "Are you sure you want to remove selected element from markup?",
   "Areas mode",
   "Audio",
   "Authors",
   "automatic creation of dictionaries from text corpora",
   "automatic segmentation of native speaker surveys, uploaded into the Telegram channel “LingvoDoc Support”, into separate words",
   "Available corpora",
   "Available dictionaries",
   "Back",
   "Base blob",
   "Begin",
   "Browse",
   "By Grants",
   "By Languages",
   "By Organizations",
   "Cancel",
   "Check all",
   "Choose groups for areas",
   "Clear",
   "Clear all",
   "Clear completed",
   "Client type",
   "Close",
   "Cognate acoustic analysis",
   "Cognate analysis",
   "Cognate multi-language reconstruction",
   "Cognate multi-language suggestions",
   "Cognate reconstruction",
   "Cognate suggestions",
   "Columns Mapping",
   "Confirm Password",
   "Confirmation",
   "Connect",
   "Connected",
   "Contibutions",
   "Conversion is in progress...",
   "Convert",
   "Convert to dictionary...",
   "Corpora",
   "Corpora created",
   "Corpus names and metadata",
   "Create",
   "Create a new field",
   "Create a new perspective...",
   "Create corpus",
   "Create dictionary",
   "Create field",
   "Create language",
   "Create one or more perspectives",
   "Created",
   "creating any columns; adding any text, audio files, marking spectrograms using the Praat phonetic software; creating etymological connections between words from different dictionaries",
   "creating search queries of any type of complexity and plotting them on the map",
   "Critically endangered",
   "Dashboard",
   "data processing and analysis software: phonetic analysis; search for etymologies; analysis of cognates in dialects and several languages; acoustic analysis of cognates; measuring phonological statistical distance; phonemic analysis; reconstruction of cognates in dialects and several languages",
   "data processing with existing parsers (for the Erzya, Moksha, Udmurt, Komi, Kazakh, Tatar languages) or creating new parsers quickly and integrating them into LingvoDoc",
   "Data source",
   "Date",
   "Date removed from publication",
   "Deactivate",
   "Definitely endangered",
   "Delete",
   "Designed for compiling, analyzing and storing dictionaries, corpora and concordances of various languages and dialects.",
   "Desktop",
   "Dialeqt file",
   "Dictionaries",
   "Dictionaries created out of grant",
   "Dictionary",
   "Dictionary created",
   "Dictionary names",
   "Dictionary names and metadata",
   "Disable all markers of the groups this marker belongs to.",
   "Disable marker",
   "Disconnected",
   "Display mode",
   "Distance map",
   "Edit",
   "Edit interface translations",
   "Edit profile",
   "Email",
   "Email is required",
   "End",
   "Entities",
   "Entity matching algorithm",
   "Entity matching threshold",
   "Entity status",
   "Entity type",
   "Execute",
   "Expedition",
   "Extinct",
   "extinct languages",
   "Failed to ban user!",
   "Failed to launch sound and markup compilation!",
   "Failed to launch valency data compilation!",
   "Field",
   "Field Type",
   "Fields",
   "File selection",
   "Files",
   "Fill metadata information",
   "Filter",
   "Finish",
   "Follow the link to learn more about using these options:",
   "From:",
   "Full name",
   "Genre",
   "Grammar",
   "Grant",
   "Grant Issuer",
   "Grant Number",
   "Grant URL",
   "Grants",
   "Grants and organizations",
   "Group",
   "Grouping tag",
   "Has audio",
   "Help",
   "Human settlement",
   "Image",
   "Import",
   "Import Dialeqt dictionary",
   "Import Starling dictionaries",
   "Import dialeqt",
   "Info",
   "Informant",
   "Interrogator",
   "Invalid email address",
   "Issuer URL",
   "It currently contains",
   "It keeps records on some",
   "It stores",
   "Join",
   "Language",
   "Language Selection",
   "Language corpora",
   "Language degree of endangerment",
   " Language degree of endangerment (selection affects selected languages and dictionaries)",
   "Language edit",
   "Languages",
   "Languages databases",
   "Levenshtein distance limit for entity content matching",
   "Lexical entries",
   "Lexical entries not found",
   "License",
   "Lingvodoc creators",
   "LingvoDoc is a linguistic platform.",
   "Link",
   "Link columns from files with each other",
   "Linking",
   "Loading",
   "Loading additional filter data...",
   "Loading suggestions...",
   "Location",
   "Login",
   "Login is required",
   "Many dialects have already disappeared, and the LingvoDoc platform holds data from archives, which are presently stacked and inaccessible.",
   "Map",
   "Map dictionaries to LingvoDoc languages",
   "Map linked columns to LingvoDoc types",
   "mapping geographic areas",
   "Maps",
   "Match translations",
   "Members",
   "Merge group",
   "Merge lexical entries",
   "Merge suggestions",
   "Merge task created successfully",
   "Merged successfully",
   "Message",
   "Metadata",
   "more than 1000 audio dictionaries",
   "Move marker to group",
   "My corpora",
   "My dictionaries",
   "My files",
   "Name",
   "Name is required",
   "New password",
   "News editor",
   "Next",
   "Next Step",
   "No audio",
   "No authors found",
   "No background tasks",
   "No coordinate data",
   "No data found for analysis, please select another dictionary",
   "No entries",
   "No fields, click button below to add a new one",
   "No file selected",
   "No groups to select",
   "No language degree of endangerment found",
   "No more locales!",
   "No settlement found",
   "No suggestions",
   "No years found",
   "None",
   "Not chosen",
   "Not supported",
   "Nothing here, sorry",
   "Nothing to",
   "Number of native speakers",
   "OR/AND mode",
   "Off-grant projects",
   "Old password",
   "on the endangered languages of Russia",
   "Open map",
   "Opportunities",
   "Organization",
   "Organization name",
   "Organizations",
   "Organization admins",
   "Organization users",
   "Owners",
   "PDF file",
   "Page",
   "Parent language",
   "Parser execution",
   "Parser task has been started",
   "Password",
   "Perspective",
   "Perspective names",
   "Perspective state",
   "Perspectives",
   "Phonemic analysis",
   "Phonological statistical distance",
   "Phonology",
   "Please select a user",
   "Please select an element",
   "Please sign in",
   "Please, select the parent language",
   "presenting results as online fragments of audio dictionaries and corpora which can be further edited or in the Excel file format",
   "Preview",
   "Processing",
   "Project funded by grants",
   "Properties",
   "Properties...",
   "Proposed variants",
   "Publication date",
   "Publish",
   "Publish Entities",
   "Publish result of entity merge if any merged entity is published",
   "Quantitative characteristic",
   "Refresh",
   "Reject",
   "Relation",
   "Removal date",
   "Remove",
   "Remove dictionary",
   "Remove from markup",
   "Remove lexical entries",
   "Remove perspective",
   "Remove user",
   "Request has been sent to the grant's owner.",
   "Requests",
   "representing the dialects of various world languages",
   "Return to tree",
   "Role",
   "Roles",
   "Safe",
   "Save",
   "Save all",
   "Save dictionary",
   "Save markup",
   "Save only published",
   "Save sound recordings",
   "Search",
   "Search in found",
   "Select",
   "Select Language for",
   "Select Parent Language",
   "Select a dictionary for analysis",
   "Select all",
   "Select all on current page",
   "Select audio",
   "Select authors",
   "Select data source",
   "Select Dialeqt file for import",
   "Select dictionary",
   "Select language",
   "Select language degree of endangerment",
   "Select language for the new dictionary",
   "Select languages",
   "Select parser",
   "Select settlement",
   "Select tags",
   "Select user",
   "Select years",
   "Service",
   "Set corpus name, translations and metadata",
   "Set dictionary name and translations",
   "Set dictionary name, translations and metadata",
   "Settlement",
   "Severely endangered",
   "Show",
   "Show statistics",
   "Sign In",
   "Sign Up",
   "Sign out",
   "software for morphological analysis of glossed corpora, in particular, automatic identification of government models",
   "Sound and markup",
   "Sound and markup compilation is being created. Check out tasks for details.",
   "Split contents of the field on punctuation before matching",
   "Split contents of the field on whitespace before matching",
   "Spread",
   "Start typing language name",
   "Statistics",
   "Storage",
   "Subject",
   "Submit",
   "Support",
   "Support@Telegram",
   "Sync",
   "Tasks",
   "Text markup",
   "The entity is NOT currently published. Click to publish.",
   "The entity is currently published. Click to unpublish.",
   "The pros of the LingvoDoc platform",
   "The work is supported by the following grants",
   "There are unsaved changes present. Are you sure you want to discard it?",
   "There is no languages and dictionaries with chosen language degree of endangerment. The search will be performed with all languages and dictionaries.",
   "This page is available for administrator only",
   "To:",
   "Tools",
   "Translation for",
   "Translations",
   "Type",
   "Type to search",
   "URL with results of saving data should appear soon after clicking save button in the tasks",
   "Uncheck all",
   "unique data",
   "Unique software that reproduces the experimental-phonetic, etymological and morphological work of a researcher 100 times faster",
   "Unknow request type!",
   "Unknown type",
   "Up",
   "Update",
   "Update dictionary",
   "Upload",
   "Upload successful",
   "uploading audio files of any size, (audio)corpora in ELAN format, texts in Word .odt format",
   "User",
   "User account activation/deactivation",
   "User defined variant",
   "User options for mapping linguistic features",
   "User options for working with dictionaries",
   "User options for working with text corpora",
   "user-friendly interface for online manual word sense disambiguation which may arise after the text has been processed by the parser",
   "Valency",
   "Valency data is being compiled. Check out tasks for details.",
   "Version",
   "View",
   "View contributions",
   "View published",
   "View suggestions",
   "Vulnerable",
   "Years",
   "You have selected:",
   "Your corpora is created, click",
   "Your dictionaries are scheduled for conversion. Please, check tasks tab for conversion status.",
   "Your dictionary is created, click",
   "Your dictionary is created, clickRequests",
   "confidence",
   "desktop",
   "has linked field",
   "here",
   "no",
   "selected",
   "to view.",
   "total",
   "web",
   "yes",
   "300 text corpora",
   "(for example, Eastern Mansi) as well as those that are in danger of extinction (that is, languages that have no more than 10 speakers over 60 years old left)."
];

export function getTranslation(string) {
  const translation = i18n.get(string);

  /*console.log('translation');
  console.log(translation);*/
  return (translation === undefined) ? string : translation;
}

function setTranslation(string, translatedString) {
  if (translatedString == null || translatedString === undefined) {
    i18n.set(string, string);
  } else {
    i18n.set(string, translatedString);
  }
}

export function setTranslations(translations) {
  for (let i = 0; i < stringsToTranslate.length; i++) {
    const gist = translations[i];
    if (gist != null) { setTranslation(stringsToTranslate[i], gist.translation); }
  }
}
