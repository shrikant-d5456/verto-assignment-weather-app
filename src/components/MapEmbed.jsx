import React, { useState, useEffect } from "react";

const MapEmbed = ({ lat, lng }) => {
  if (!lat || !lng) return null;

  const src = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d40538.726901462134!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1759475363639!5m2!1sen!2sin`;

  return (
    <div className=" w-full h-[300px] bg-black/20 rounded-3xl overflow-hidden my-4">
      <iframe
      src={src}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="Google Map"
      className="w-full h-full  object-cover opacity-80"
    ></iframe>
    </div>
  );
};

export default MapEmbed;
