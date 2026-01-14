import React from "react";

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 mt-50px">
      <p className="text-lg text-gray-700 mb-4">
        <strong>Bhatora Golap Sangha</strong> is a well-known social and
        cultural club established in the year <strong>2002</strong>. The club is
        officially registered under{" "}
        <strong>Registration No: S/2L/130570</strong>.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        Located at <strong>Bhatora (Sibtala), Joypur, Howrah</strong>, the club
        has built a strong identity through its unique ideology and cultural
        contributions to society.
      </p>

      <p className="text-lg text-gray-700 mb-4">
        Bhatora Golap Sangha is especially famous for its
        <strong> Saraswati Puja</strong>. Every year, the club represents its
        ideology through creative and meaningful <strong>pandal themes</strong>.
        These themes are often inspired by <strong>historical events</strong>{" "}
        and
        <strong> social issues</strong>, aiming to spread awareness and cultural
        values among the community.
      </p>

      <p className="text-lg text-gray-700 mb-8">
        With dedication, creativity, and social responsibility, Bhatora Golap
        Sangha continues to be a symbol of unity and cultural excellence in the
        region.
      </p>

      <div className="w-full h-[450px] rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d471606.8289566391!2d87.32639035000003!3d22.563077099999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02a174633976d9%3A0xc60be9800bbb9760!2z4Kat4Ka-4Kaf4KeL4Kaw4Ka-IOCml-Cni-CmsuCmvuCmqiDgprjgpoLgppg!5e0!3m2!1sen!2sin!4v1768406860609!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Bhatora Golap Sangha Location"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUs;
