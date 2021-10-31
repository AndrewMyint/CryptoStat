export const numberWithCommas = (x) => {
  return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const isEven = (x) => {
  return parseFloat(x) < 0 ? false : true;
};

export const extractRootDomain = (url) => {
  var domain = extractHostname(url),
    splitArr = domain.split("."),
    arrLen = splitArr.length;

  //extracting the root domain here
  //if there is a subdomain
  if (arrLen > 2) {
    domain = splitArr[arrLen - 2] + "." + splitArr[arrLen - 1];
    //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk")
    if (
      splitArr[arrLen - 2].length === 2 &&
      splitArr[arrLen - 1].length === 2
    ) {
      //this is using a ccTLD
      domain = splitArr[arrLen - 3] + "." + domain;
    }
  }
  return domain;
};
function extractHostname(url) {
  var hostname;
  //find & remove protocol (http, ftp, etc.) and get hostname

  if (url.indexOf("//") > -1) {
    hostname = url.split("/")[2];
  } else {
    hostname = url.split("/")[0];
  }

  //find & remove port number
  hostname = hostname.split(":")[0];
  //find & remove "?"
  hostname = hostname.split("?")[0];

  return hostname;
}

export const generateSocialBadges = (links) => {
  if (!links) return;
  const notOther = [
    "youtube",
    "facebook",
    "twitter",
    "reddit",
    "telegram",
    "website",
    "github",
  ];
  return {
    youtube: links.filter((d) => d.type === "youtube"),
    facebook: links.filter((d) => d.type === "facebook"),
    twitter: links.filter((d) => d.type === "twitter"),
    reddit: links.filter((d) => d.type === "reddit"),
    telegram: links.filter((d) => d.type === "telegram"),
    other: links.filter((d) => !notOther.includes(d.type)),
  };
};
// export const generateResource = (links) => {
//   let explorers,
//     community = [];
//   links.forEach((obj, i) => {
//     if (obj.type === "reddit" || obj.type === "telegram") {
//       community.push(obj);
//     }
// //   });
// };
