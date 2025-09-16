
export const defaultUTMs = {
  notas_de_prensa_bpd: {
    utm_sources: ["Instagram-story", "Facebook", "Twitter", "advocacy"],
    utm_medium: "Redes",
    utm_campaign: "NotadePrensa"
  },
  notas_de_prensa_gp: {
    utm_sources_custom: [
      { utm_source: "Instagram-story", utm_medium: "social" },
      { utm_source: "advocacy", utm_medium: "social" },
      { utm_source: "Linkedin", utm_medium: "redes" }
    ],
    utm_campaign: "NotadePrensa"
  },
  podcast: {
    utm_campaign: "Podcast",
    utm_medium: "redes",
    utm_sources: ["Facebook", "Instagram-story", "Linkedin", "Twitter"],
    utm_sources_custom: [
      { utm_source: "advocacy", utm_medium: "advocacy" }
    ]
  },
  podcast_inversiones_en_breve: {
    utm_campaign: "PodcastInversiones",
    utm_medium: "redes",
    utm_sources: ["Instagram-story", "Instagram-feed", "Mailing", "ComunicacionInterna", "Advocacy"]
  },
  blog: {
    utm_campaign: "Blog",
    utm_medium: "redes",
    utm_sources: [
      "Facebook",
      "Instagram-story",
      "Twitter",
      "advocacy",
      "Linkedin"
    ]
  },
  eflows: {
    utm_campaign: "nota_de_prensa",
    utm_medium: "oficinas",
    utm_sources: ["eflow"]
  },
  casacordon: {
    utm_sources: [
      "Facebook",
      "Twitter",
      "Instagram",
      "Linkedin",
      "advocacy"
    ],
    utm_medium: "redes",
    utm_campaign: "blog",
    utm_sources_custom: [
      { utm_source: "newsletter", utm_medium: "email", utm_campaign: "cctcc" }
    ]
  },
  newsletter_popular_al_dia: {
    dynamic_campaign: true,
    utm_sources: ["newsletter"],
    utm_medium: "email"
  }
};

export const appendUTMParams = (url, params) => {
  try {
    const urlObj = new URL(url);

    Object.entries(params).forEach(([key, value]) => {
      urlObj.searchParams.set(key, value);
    });

    return urlObj.toString();

  } catch (error) {
    return url; 
  }
};

const getDynamicCampaign = () => {

  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const hoy = new Date();
  return `${meses[hoy.getMonth()]}${hoy.getFullYear()}`;
};

export const generateUTMsForType = (url, typeConfig) => {
  const campaign = typeConfig.dynamic_campaign
    ? getDynamicCampaign()
    : typeConfig.utm_campaign;

  let urls = [];


  if (typeConfig.utm_sources) {
    urls = urls.concat(
      typeConfig.utm_sources.map(source => {
        const utmParams = {
          utm_source: source,
          utm_medium: typeConfig.utm_medium,
          utm_campaign: campaign
        };
        return {
          source,
          utm_url: appendUTMParams(url, utmParams)
        };
      })
    );
  }


  if (typeConfig.utm_sources_custom) {
    urls = urls.concat(
      typeConfig.utm_sources_custom.map(item => {
        const utmParams = {
          utm_source: item.utm_source,
          utm_medium: item.utm_medium || typeConfig.utm_medium,
          utm_campaign: item.utm_campaign || campaign
        };
        return {
          source: item.utm_source,
          utm_url: appendUTMParams(url, utmParams)
        };
      })
    );
  }

 
  return urls.length === 1 ? urls[0] : urls;
};
