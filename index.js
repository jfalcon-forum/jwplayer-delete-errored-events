import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const getLiveChannel = async (site_id, channel_id) => {
  const response = await axios({
    method: "GET",
    url: `https://api.jwplayer.com/v2/sites/${site_id}/channels/${channel_id}/`,
    headers: {
      accept: "application/json",
      Authorization: process.env.JWPLAYER_SECRET,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        };
      } else {
        return "Error", error.message;
      }
    });
  return response;
};

const deleteMedia = async (site_id, media_id) => {
  const response = await axios({
    method: "DELETE",
    url: `https://api.jwplayer.com/v2/sites/${site_id}/media/${media_id}/`,
    headers: {
      accept: "application/json",
      Authorization: process.env.JWPLAYER_SECRET,
    },
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response) {
        return {
          error: {
            status: error.response.status,
            data: error.response.data,
          },
        };
      } else {
        return "Error", error.message;
      }
    });
  return response;
};

export const handler = async (event) => {
  if (event === undefined) {
    return {
      status: 401,
      message: "malformed event",
    };
  }
  if (event.channel_id !== "oQI9YDnI") {
    return;
  }
  let siteId = event.site_id;
  const channel = await getLiveChannel(event.site_id, event.channel_id);
  const erroredEvents = channel.recent_events.map((event) => {
    if (event.status === "errored") {
      return event;
    }
  });
  const filteredEvents = erroredEvents.filter((event) => {
    return event !== undefined;
  });
  if (filteredEvents.length > 0) {
    for (const event of filteredEvents) {
      const deletedEvent = await deleteMedia(siteId, event.media_id);
      console.log(deletedEvent);
    }
  }
};
