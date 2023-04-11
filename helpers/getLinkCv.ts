import { LINK_BACKEND } from "../utils/constanstApi";

export const getLinkToCv = (link: string = "", withoutSlice: boolean) => {
  const cleanLink = withoutSlice ? link.slice(5) : link;
  return `${LINK_BACKEND}${cleanLink}`;
};
