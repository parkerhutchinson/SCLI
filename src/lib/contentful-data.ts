interface IFetchConfig {
  link: string;
  object: {
    method: string;
    headers: { [index: string]: string };
    body?: string;
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
  method: "GET"|"PUT"|"DELETE",
  data?: { [payload: string]: unknown }
): Promise<response> => {
  const CMA: string | undefined = Deno.env.get("CONTENTFUL_MANAGEMENT_ACCESS_TOKEN");
  const resourcePath = `https://api.contentful.com/spaces/beyz5544apud/${type}`;
  let contentfulData;

  const config: IFetchConfig = {
    link: resourcePath,
    object: {
      method: method,
      headers: {
        Accept: "application/vnd.contentful.management.v1+json",
        "Content-Type": "application/vnd.contentful.management.v1+json",
        Host: "api.contentful.com",
        Authorization: `Bearer ${CMA}`,
      },
    },
  };

  // ootional data payload
  if(data) {
    config.object.body = JSON.stringify(data);
  }
  
  const contentfulResponse = await fetch(config.link, config.object);
  
  // since no body is returned for a successful deletion we do this
  if (contentfulResponse.status === 204) {
    contentfulData = {
      message: contentfulResponse.statusText,
      sys: {
        type: "success",
      }
    }
  } else {
    contentfulData = await contentfulResponse.json();
  }

  return contentfulData.sys.type !== "Error" || contentfulData.sys.type === "Environment"
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
  const space: string | undefined = Deno.env.get("CONTENTFUL_SPACE_ID");

  const config: IFetchConfig = {
    link: `https://cdn.contentful.com/spaces/${space}/${type}?access_token=${auth}`,
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
