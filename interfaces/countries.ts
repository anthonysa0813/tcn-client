import { v4 as uuidv4 } from "uuid";

export interface CountryType {
  id?: string;
  value?: string;
  code: string;
  label?: string;
  phone: string;
  suggested?: boolean;
}

export const countriesDataMaterial = [
  { id: uuidv4(), code: "AD", value: "Andorra", phone: "376" },
  {
    id: uuidv4(),
    code: "AE",
    value: "United Arab Emirates",
    phone: "971",
  },
  { id: uuidv4(), code: "AF", value: "Afghanistan", phone: "93" },
  {
    id: uuidv4(),
    code: "AG",
    value: "Antigua and Barbuda",
    phone: "1-268",
  },
  { id: uuidv4(), code: "AI", value: "Anguilla", phone: "1-264" },
  { id: uuidv4(), code: "AL", value: "Albania", phone: "355" },
  { id: uuidv4(), code: "AM", value: "Armenia", phone: "374" },
  { id: uuidv4(), code: "AO", value: "Angola", phone: "244" },
  { id: uuidv4(), code: "AQ", value: "Antarctica", phone: "672" },
  { id: uuidv4(), code: "AR", value: "Argentina", phone: "54" },
  { id: uuidv4(), code: "AS", value: "American Samoa", phone: "1-684" },
  { id: uuidv4(), code: "AT", value: "Austria", phone: "43" },
  {
    id: uuidv4(),
    code: "AU",
    value: "Australia",
    phone: "61",
    suggested: true,
  },
  { id: uuidv4(), code: "AW", value: "Aruba", phone: "297" },
  { id: uuidv4(), code: "AX", value: "Alland Islands", phone: "358" },
  { id: uuidv4(), code: "AZ", value: "Azerbaijan", phone: "994" },
  {
    id: uuidv4(),
    code: "BA",
    value: "Bosnia and Herzegovina",
    phone: "387",
  },
  { id: uuidv4(), code: "BB", value: "Barbados", phone: "1-246" },
  { id: uuidv4(), code: "BD", value: "Bangladesh", phone: "880" },
  { id: uuidv4(), code: "BE", value: "Belgium", phone: "32" },
  { id: uuidv4(), code: "BF", value: "Burkina Faso", phone: "226" },
  { id: uuidv4(), code: "BG", value: "Bulgaria", phone: "359" },
  { id: uuidv4(), code: "BH", value: "Bahrain", phone: "973" },
  { id: uuidv4(), code: "BI", value: "Burundi", phone: "257" },
  { id: uuidv4(), code: "BJ", value: "Benin", phone: "229" },
  { id: uuidv4(), code: "BL", value: "Saint Barthelemy", phone: "590" },
  { id: uuidv4(), code: "BM", value: "Bermuda", phone: "1-441" },
  { id: uuidv4(), code: "BN", value: "Brunei Darussalam", phone: "673" },
  { id: uuidv4(), code: "BO", value: "Bolivia", phone: "591" },
  { id: uuidv4(), code: "BR", value: "Brazil", phone: "55" },
  { id: uuidv4(), code: "BS", value: "Bahamas", phone: "1-242" },
  { id: uuidv4(), code: "BT", value: "Bhutan", phone: "975" },
  { id: uuidv4(), code: "BV", value: "Bouvet Island", phone: "47" },
  { id: uuidv4(), code: "BW", value: "Botswana", phone: "267" },
  { id: uuidv4(), code: "BY", value: "Belarus", phone: "375" },
  { id: uuidv4(), code: "BZ", value: "Belize", phone: "501" },
  {
    id: uuidv4(),
    code: "CA",
    value: "Canada",
    phone: "1",
    suggested: true,
  },
  {
    id: uuidv4(),
    code: "CC",
    value: "Cocos (Keeling) Islands",
    phone: "61",
  },
  {
    id: uuidv4(),
    code: "CD",
    value: "Congo, Democratic Republic of the",
    phone: "243",
  },
  {
    id: uuidv4(),
    code: "CF",
    value: "Central African Republic",
    phone: "236",
  },
  {
    id: uuidv4(),
    code: "CG",
    value: "Congo, Republic of the",
    phone: "242",
  },
  { id: uuidv4(), code: "CH", value: "Switzerland", phone: "41" },
  { id: uuidv4(), code: "CI", value: "Cote d'Ivoire", phone: "225" },
  { id: uuidv4(), code: "CK", value: "Cook Islands", phone: "682" },
  { id: uuidv4(), code: "CL", value: "Chile", phone: "56" },
  { id: uuidv4(), code: "CM", value: "Cameroon", phone: "237" },
  { id: uuidv4(), code: "CN", value: "China", phone: "86" },
  { id: uuidv4(), code: "CO", value: "Colombia", phone: "57" },
  { id: uuidv4(), code: "CR", value: "Costa Rica", phone: "506" },
  { id: uuidv4(), code: "CU", value: "Cuba", phone: "53" },
  { id: uuidv4(), code: "CV", value: "Cape Verde", phone: "238" },
  { id: uuidv4(), code: "CW", value: "Curacao", phone: "599" },
  { id: uuidv4(), code: "CX", value: "Christmas Island", phone: "61" },
  { id: uuidv4(), code: "CY", value: "Cyprus", phone: "357" },
  { id: uuidv4(), code: "CZ", value: "Czech Republic", phone: "420" },
  {
    id: uuidv4(),
    code: "DE",
    value: "Germany",
    phone: "49",
    suggested: true,
  },
  { id: uuidv4(), code: "DJ", value: "Djibouti", phone: "253" },
  { id: uuidv4(), code: "DK", value: "Denmark", phone: "45" },
  { id: uuidv4(), code: "DM", value: "Dominica", phone: "1-767" },
  {
    id: uuidv4(),
    code: "DO",
    value: "Dominican Republic",
    phone: "1-809",
  },
  { id: uuidv4(), code: "DZ", value: "Algeria", phone: "213" },
  { id: uuidv4(), code: "EC", value: "Ecuador", phone: "593" },
  { id: uuidv4(), code: "EE", value: "Estonia", phone: "372" },
  { id: uuidv4(), code: "EG", value: "Egypt", phone: "20" },
  { id: uuidv4(), code: "EH", value: "Western Sahara", phone: "212" },
  { id: uuidv4(), code: "ER", value: "Eritrea", phone: "291" },
  { id: uuidv4(), code: "ES", value: "Spain", phone: "34" },
  { id: uuidv4(), code: "ET", value: "Ethiopia", phone: "251" },
  { id: uuidv4(), code: "FI", value: "Finland", phone: "358" },
  { id: uuidv4(), code: "FJ", value: "Fiji", phone: "679" },
  {
    id: uuidv4(),
    code: "FK",
    value: "Falkland Islands (Malvinas)",
    phone: "500",
  },
  {
    id: uuidv4(),
    code: "FM",
    value: "Micronesia, Federated States of",
    phone: "691",
  },
  { id: uuidv4(), code: "FO", value: "Faroe Islands", phone: "298" },
  {
    id: uuidv4(),
    code: "FR",
    value: "France",
    phone: "33",
    suggested: true,
  },
  { id: uuidv4(), code: "GA", value: "Gabon", phone: "241" },
  { id: uuidv4(), code: "GB", value: "United Kingdom", phone: "44" },
  { id: uuidv4(), code: "GD", value: "Grenada", phone: "1-473" },
  { id: uuidv4(), code: "GE", value: "Georgia", phone: "995" },
  { id: uuidv4(), code: "GF", value: "French Guiana", phone: "594" },
  { id: uuidv4(), code: "GG", value: "Guernsey", phone: "44" },
  { id: uuidv4(), code: "GH", value: "Ghana", phone: "233" },
  { id: uuidv4(), code: "GI", value: "Gibraltar", phone: "350" },
  { id: uuidv4(), code: "GL", value: "Greenland", phone: "299" },
  { id: uuidv4(), code: "GM", value: "Gambia", phone: "220" },
  { id: uuidv4(), code: "GN", value: "Guinea", phone: "224" },
  { id: uuidv4(), code: "GP", value: "Guadeloupe", phone: "590" },
  { id: uuidv4(), code: "GQ", value: "Equatorial Guinea", phone: "240" },
  { id: uuidv4(), code: "GR", value: "Greece", phone: "30" },
  {
    id: uuidv4(),
    code: "GS",
    value: "South Georgia and the South Sandwich Islands",
    phone: "500",
  },
  { id: uuidv4(), code: "GT", value: "Guatemala", phone: "502" },
  { id: uuidv4(), code: "GU", value: "Guam", phone: "1-671" },
  { id: uuidv4(), code: "GW", value: "Guinea-Bissau", phone: "245" },
  { id: uuidv4(), code: "GY", value: "Guyana", phone: "592" },
  { id: uuidv4(), code: "HK", value: "Hong Kong", phone: "852" },
  {
    id: uuidv4(),
    code: "HM",
    value: "Heard Island and McDonald Islands",
    phone: "672",
  },
  { id: uuidv4(), code: "HN", value: "Honduras", phone: "504" },
  { id: uuidv4(), code: "HR", value: "Croatia", phone: "385" },
  { id: uuidv4(), code: "HT", value: "Haiti", phone: "509" },
  { id: uuidv4(), code: "HU", value: "Hungary", phone: "36" },
  { id: uuidv4(), code: "ID", value: "Indonesia", phone: "62" },
  { id: uuidv4(), code: "IE", value: "Ireland", phone: "353" },
  { id: uuidv4(), code: "IL", value: "Israel", phone: "972" },
  { id: uuidv4(), code: "IM", value: "Isle of Man", phone: "44" },
  { id: uuidv4(), code: "IN", value: "India", phone: "91" },
  {
    id: uuidv4(),
    code: "IO",
    value: "British Indian Ocean Territory",
    phone: "246",
  },
  { id: uuidv4(), code: "IQ", value: "Iraq", phone: "964" },
  {
    id: uuidv4(),
    code: "IR",
    value: "Iran, Islamic Republic of",
    phone: "98",
  },
  { id: uuidv4(), code: "IS", value: "Iceland", phone: "354" },
  { id: uuidv4(), code: "IT", value: "Italy", phone: "39" },
  { id: uuidv4(), code: "JE", value: "Jersey", phone: "44" },
  { id: uuidv4(), code: "JM", value: "Jamaica", phone: "1-876" },
  { id: uuidv4(), code: "JO", value: "Jordan", phone: "962" },
  {
    id: uuidv4(),
    code: "JP",
    value: "Japan",
    phone: "81",
    suggested: true,
  },
  { id: uuidv4(), code: "KE", value: "Kenya", phone: "254" },
  { id: uuidv4(), code: "KG", value: "Kyrgyzstan", phone: "996" },
  { id: uuidv4(), code: "KH", value: "Cambodia", phone: "855" },
  { id: uuidv4(), code: "KI", value: "Kiribati", phone: "686" },
  { id: uuidv4(), code: "KM", value: "Comoros", phone: "269" },
  {
    id: uuidv4(),
    code: "KN",
    value: "Saint Kitts and Nevis",
    phone: "1-869",
  },
  {
    id: uuidv4(),
    code: "KP",
    value: "Korea, Democratic People's Republic of",
    phone: "850",
  },
  { id: uuidv4(), code: "KR", value: "Korea, Republic of", phone: "82" },
  { id: uuidv4(), code: "KW", value: "Kuwait", phone: "965" },
  { id: uuidv4(), code: "KY", value: "Cayman Islands", phone: "1-345" },
  { id: uuidv4(), code: "KZ", value: "Kazakhstan", phone: "7" },
  {
    id: uuidv4(),
    code: "LA",
    value: "Lao People's Democratic Republic",
    phone: "856",
  },
  { id: uuidv4(), code: "LB", value: "Lebanon", phone: "961" },
  { id: uuidv4(), code: "LC", value: "Saint Lucia", phone: "1-758" },
  { id: uuidv4(), code: "LI", value: "Liechtenstein", phone: "423" },
  { id: uuidv4(), code: "LK", value: "Sri Lanka", phone: "94" },
  { id: uuidv4(), code: "LR", value: "Liberia", phone: "231" },
  { id: uuidv4(), code: "LS", value: "Lesotho", phone: "266" },
  { id: uuidv4(), code: "LT", value: "Lithuania", phone: "370" },
  { id: uuidv4(), code: "LU", value: "Luxembourg", phone: "352" },
  { id: uuidv4(), code: "LV", value: "Latvia", phone: "371" },
  { id: uuidv4(), code: "LY", value: "Libya", phone: "218" },
  { id: uuidv4(), code: "MA", value: "Morocco", phone: "212" },
  { id: uuidv4(), code: "MC", value: "Monaco", phone: "377" },
  {
    id: uuidv4(),
    code: "MD",
    value: "Moldova, Republic of",
    phone: "373",
  },
  { id: uuidv4(), code: "ME", value: "Montenegro", phone: "382" },
  {
    id: uuidv4(),
    code: "MF",
    value: "Saint Martin (French part)",
    phone: "590",
  },
  { id: uuidv4(), code: "MG", value: "Madagascar", phone: "261" },
  { id: uuidv4(), code: "MH", value: "Marshall Islands", phone: "692" },
  {
    id: uuidv4(),
    code: "MK",
    value: "Macedonia, the Former Yugoslav Republic of",
    phone: "389",
  },
  { id: uuidv4(), code: "ML", value: "Mali", phone: "223" },
  { id: uuidv4(), code: "MM", value: "Myanmar", phone: "95" },
  { id: uuidv4(), code: "MN", value: "Mongolia", phone: "976" },
  { id: uuidv4(), code: "MO", value: "Macao", phone: "853" },
  {
    id: uuidv4(),
    code: "MP",
    value: "Northern Mariana Islands",
    phone: "1-670",
  },
  { id: uuidv4(), code: "MQ", value: "Martinique", phone: "596" },
  { id: uuidv4(), code: "MR", value: "Mauritania", phone: "222" },
  { id: uuidv4(), code: "MS", value: "Montserrat", phone: "1-664" },
  { id: uuidv4(), code: "MT", value: "Malta", phone: "356" },
  { id: uuidv4(), code: "MU", value: "Mauritius", phone: "230" },
  { id: uuidv4(), code: "MV", value: "Maldives", phone: "960" },
  { id: uuidv4(), code: "MW", value: "Malawi", phone: "265" },
  { id: uuidv4(), code: "MX", value: "Mexico", phone: "52" },
  { id: uuidv4(), code: "MY", value: "Malaysia", phone: "60" },
  { id: uuidv4(), code: "MZ", value: "Mozambique", phone: "258" },
  { id: uuidv4(), code: "NA", value: "Namibia", phone: "264" },
  { id: uuidv4(), code: "NC", value: "New Caledonia", phone: "687" },
  { id: uuidv4(), code: "NE", value: "Niger", phone: "227" },
  { id: uuidv4(), code: "NF", value: "Norfolk Island", phone: "672" },
  { id: uuidv4(), code: "NG", value: "Nigeria", phone: "234" },
  { id: uuidv4(), code: "NI", value: "Nicaragua", phone: "505" },
  { id: uuidv4(), code: "NL", value: "Netherlands", phone: "31" },
  { id: uuidv4(), code: "NO", value: "Norway", phone: "47" },
  { id: uuidv4(), code: "NP", value: "Nepal", phone: "977" },
  { id: uuidv4(), code: "NR", value: "Nauru", phone: "674" },
  { id: uuidv4(), code: "NU", value: "Niue", phone: "683" },
  { id: uuidv4(), code: "NZ", value: "New Zealand", phone: "64" },
  { id: uuidv4(), code: "OM", value: "Oman", phone: "968" },
  { id: uuidv4(), code: "PA", value: "Panama", phone: "507" },
  { id: uuidv4(), code: "PE", value: "Peru", phone: "51" },
  { id: uuidv4(), code: "PF", value: "French Polynesia", phone: "689" },
  { id: uuidv4(), code: "PG", value: "Papua New Guinea", phone: "675" },
  { id: uuidv4(), code: "PH", value: "Philippines", phone: "63" },
  { id: uuidv4(), code: "PK", value: "Pakistan", phone: "92" },
  { id: uuidv4(), code: "PL", value: "Poland", phone: "48" },
  {
    id: uuidv4(),
    code: "PM",
    value: "Saint Pierre and Miquelon",
    phone: "508",
  },
  { id: uuidv4(), code: "PN", value: "Pitcairn", phone: "870" },
  { id: uuidv4(), code: "PR", value: "Puerto Rico", phone: "1" },
  {
    id: uuidv4(),
    code: "PS",
    value: "Palestine, State of",
    phone: "970",
  },
  { id: uuidv4(), code: "PT", value: "Portugal", phone: "351" },
  { id: uuidv4(), code: "PW", value: "Palau", phone: "680" },
  { id: uuidv4(), code: "PY", value: "Paraguay", phone: "595" },
  { id: uuidv4(), code: "QA", value: "Qatar", phone: "974" },
  { id: uuidv4(), code: "RE", value: "Reunion", phone: "262" },
  { id: uuidv4(), code: "RO", value: "Romania", phone: "40" },
  { id: uuidv4(), code: "RS", value: "Serbia", phone: "381" },
  { id: uuidv4(), code: "RU", value: "Russian Federation", phone: "7" },
  { id: uuidv4(), code: "RW", value: "Rwanda", phone: "250" },
  { id: uuidv4(), code: "SA", value: "Saudi Arabia", phone: "966" },
  { id: uuidv4(), code: "SB", value: "Solomon Islands", phone: "677" },
  { id: uuidv4(), code: "SC", value: "Seychelles", phone: "248" },
  { id: uuidv4(), code: "SD", value: "Sudan", phone: "249" },
  { id: uuidv4(), code: "SE", value: "Sweden", phone: "46" },
  { id: uuidv4(), code: "SG", value: "Singapore", phone: "65" },
  { id: uuidv4(), code: "SH", value: "Saint Helena", phone: "290" },
  { id: uuidv4(), code: "SI", value: "Slovenia", phone: "386" },
  {
    id: uuidv4(),
    code: "SJ",
    value: "Svalbard and Jan Mayen",
    phone: "47",
  },
  { id: uuidv4(), code: "SK", value: "Slovakia", phone: "421" },
  { id: uuidv4(), code: "SL", value: "Sierra Leone", phone: "232" },
  { id: uuidv4(), code: "SM", value: "San Marino", phone: "378" },
  { id: uuidv4(), code: "SN", value: "Senegal", phone: "221" },
  { id: uuidv4(), code: "SO", value: "Somalia", phone: "252" },
  { id: uuidv4(), code: "SR", value: "Suriname", phone: "597" },
  { id: uuidv4(), code: "SS", value: "South Sudan", phone: "211" },
  {
    id: uuidv4(),
    code: "ST",
    value: "Sao Tome and Principe",
    phone: "239",
  },
  { id: uuidv4(), code: "SV", value: "El Salvador", phone: "503" },
  {
    id: uuidv4(),
    code: "SX",
    value: "Sint Maarten (Dutch part)",
    phone: "1-721",
  },
  {
    id: uuidv4(),
    code: "SY",
    value: "Syrian Arab Republic",
    phone: "963",
  },
  { id: uuidv4(), code: "SZ", value: "Swaziland", phone: "268" },
  {
    id: uuidv4(),
    code: "TC",
    value: "Turks and Caicos Islands",
    phone: "1-649",
  },
  { id: uuidv4(), code: "TD", value: "Chad", phone: "235" },
  {
    id: uuidv4(),
    code: "TF",
    value: "French Southern Territories",
    phone: "262",
  },
  { id: uuidv4(), code: "TG", value: "Togo", phone: "228" },
  { id: uuidv4(), code: "TH", value: "Thailand", phone: "66" },
  { id: uuidv4(), code: "TJ", value: "Tajikistan", phone: "992" },
  { id: uuidv4(), code: "TK", value: "Tokelau", phone: "690" },
  { id: uuidv4(), code: "TL", value: "Timor-Leste", phone: "670" },
  { id: uuidv4(), code: "TM", value: "Turkmenistan", phone: "993" },
  { id: uuidv4(), code: "TN", value: "Tunisia", phone: "216" },
  { id: uuidv4(), code: "TO", value: "Tonga", phone: "676" },
  { id: uuidv4(), code: "TR", value: "Turkey", phone: "90" },
  {
    id: uuidv4(),
    code: "TT",
    value: "Trinidad and Tobago",
    phone: "1-868",
  },
  { id: uuidv4(), code: "TV", value: "Tuvalu", phone: "688" },
  {
    id: uuidv4(),
    code: "TW",
    value: "Taiwan, Republic of China",
    phone: "886",
  },
  {
    id: uuidv4(),
    code: "TZ",
    value: "United Republic of Tanzania",
    phone: "255",
  },
  { id: uuidv4(), code: "UA", value: "Ukraine", phone: "380" },
  { id: uuidv4(), code: "UG", value: "Uganda", phone: "256" },
  {
    id: uuidv4(),
    code: "US",
    value: "United States",
    phone: "1",
    suggested: true,
  },
  { id: uuidv4(), code: "UY", value: "Uruguay", phone: "598" },
  { id: uuidv4(), code: "UZ", value: "Uzbekistan", phone: "998" },
  {
    id: uuidv4(),
    code: "VA",
    value: "Holy See (Vatican City State)",
    phone: "379",
  },
  {
    id: uuidv4(),
    code: "VC",
    value: "Saint Vincent and the Grenadines",
    phone: "1-784",
  },
  { id: uuidv4(), code: "VE", value: "Venezuela", phone: "58" },
  {
    id: uuidv4(),
    code: "VG",
    value: "British Virgin Islands",
    phone: "1-284",
  },
  {
    id: uuidv4(),
    code: "VI",
    value: "US Virgin Islands",
    phone: "1-340",
  },
  { id: uuidv4(), code: "VN", value: "Vietnam", phone: "84" },
  { id: uuidv4(), code: "VU", value: "Vanuatu", phone: "678" },
  { id: uuidv4(), code: "WF", value: "Wallis and Futuna", phone: "681" },
  { id: uuidv4(), code: "WS", value: "Samoa", phone: "685" },
  { id: uuidv4(), code: "XK", value: "Kosovo", phone: "383" },
  { id: uuidv4(), code: "YE", value: "Yemen", phone: "967" },
  { id: uuidv4(), code: "YT", value: "Mayotte", phone: "262" },
  { id: uuidv4(), code: "ZA", value: "South Africa", phone: "27" },
  { id: uuidv4(), code: "ZM", value: "Zambia", phone: "260" },
  { id: uuidv4(), code: "ZW", value: "Zimbabwe", phone: "263" },
];
