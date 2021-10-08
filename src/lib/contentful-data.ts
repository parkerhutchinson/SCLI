interface IFetchConfig {
  link: string;
  object: {
    method: string;
    headers: { [index: string]: string };
  };
}

type response = {
  status: "success"|"error",
  data: { [index: string]: unknown }
}

/**
 * @description this function allows you to make updates to contentful and
 * gains access to some other hidden features like listing environments.
 * @param type string: specific resource
 * @returns Promise: contentful data || error message
 */
export const manageContentfulData = async (
  type: string,
  update: boolean,
  data?: { [payload: string]: unknown }
): Promise<response> => {
  const auth: string | undefined = Deno.env.get("CONTENTFUL_MANAGEMENT_ACCESS_TOKEN");

  const config: IFetchConfig = {
    link: `https://api.contentful.com/spaces/beyz5544apud/${type}`,
    object: {
      method: update ? "PUT" : "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Host: "api.contentful.com",
        Authorization: `Bearer ${auth}`,
      },
    },
  };

  // ootional data payload
  if(data) {
    config.object.headers.Body = JSON.stringify(data);
  }
  
  const contentfulResponse = await fetch(config.link, config.object);
  const contentfulData = await contentfulResponse.json();

  return contentfulData.sys.type !== "Error"
    ? { status: "success", data: contentfulData }
    : { status: "error", data: contentfulData };
};


/**
 * @description this function fetches data from the CDN using the resource "type".
 * @param type string: specific resource
 * @returns Promise: contentful data || error message
 */
export const getContentfulData = async (type: string): Promise<response> => {
  const auth: string | undefined = Deno.env.get("CONTENTFUL_ACCESS_TOKEN");

  const config: IFetchConfig = {
    link: `https://cdn.contentful.com/spaces/beyz5544apud/${type}?access_token=${auth}`,
    object: {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Host: "api.contentful.com",
      },
    },
  };

  const contentfulResponse = await fetch(config.link, config.object);
  const contentfulData = await contentfulResponse.json();

  return contentfulData.sys.type !== "Error"
    ? { status: "success", data: contentfulData }
    : { status: "error", data: contentfulData };
};
