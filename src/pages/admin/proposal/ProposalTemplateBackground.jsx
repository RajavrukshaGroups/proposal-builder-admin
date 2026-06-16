import { FaPhoneAlt, FaEnvelope, FaGlobe, FaHome } from "react-icons/fa";
const ProposalTemplateBackground = ({ children, settings }) => {
  return (
    <div
      className="
        relative
        bg-[#f5f5f5]
        overflow-hidden
        min-h-screen
        shadow-xl
      "
    >
      {/* Top Bar */}
      <div
        className="
    absolute
    top-0
    left-0
    right-[15px]
    h-4
    bg-orange-500
  "
      />
      {/* Top Right Shape */}
      <div
        className="
    absolute
    top-0
    right-0
    w-[18px]
    h-[280px]
    bg-orange-500
    rounded-bl-[40px]
  "
      />
      {/* Bottom Left Shape */}
      <div
        className="
    absolute
    bottom-0
    left-0
    w-[18px]
    h-[200px]
    bg-gradient-to-b
    from-cyan-400
    to-blue-600
    rounded-tr-[40px]
  "
      />
      {/* Bottom Bar */}
      <div
        className="
    absolute
    bottom-0
    left-[18px]
    right-0
    h-4
    bg-blue-500
  "
      />
      {/* Watermark */}
      <img
        src={settings?.logo}
        alt=""
        className="
          absolute
          w-[280px]
          opacity-[0.03]
          left-1/2
          top-1/2
          -translate-x-1/2
          -translate-y-1/2
        "
      />
      {/* Top Divider */}
      <div className="  absolute top-[255px] md:top-[140px] left-8 right-8 border-t border-black/30" />
      {/* Left Decoration */}
      <div className="absolute left-4 bottom-[250px]">
        <div className="w-[2px] h-[220px] bg-black"></div>
        <div className="w-3 h-3 bg-black rounded-full -ml-[5px]"></div>
      </div>
      {/* Right Decoration */}
      <div className="absolute right-4 top-[350px]">
        <div className="w-[2px] h-[350px] bg-black"></div>

        <div className="w-3 h-3 bg-black rounded-full absolute top-0 -left-[5px]"></div>

        <div className="w-3 h-3 bg-black rounded-full absolute top-32 -left-[5px]"></div>
      </div>
      {/* Footer Contact Section */}
      <div
        className="
    absolute
    bottom-6
    left-10
    right-10
    flex
    flex-col
    md:flex-row
    justify-between
    items-start
    md:items-end
    gap-4
    z-20
  "
      >
        <div className="flex items-center gap-3 text-[11px] max-w-md">
          <FaHome className="text-2xl shrink-0" />
          <div className="max-w-md leading-5">{settings?.address}</div>
        </div>

        <div className="text-[11px] space-y-1 min-w-[220px]">
          <div className="flex items-center gap-2 md:justify-end">
            <FaPhoneAlt />
            {settings?.contactPhone}
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <FaEnvelope />
            {settings?.contactEmail}
          </div>
          <div className="flex items-center gap-2 md:justify-end">
            <FaGlobe />
            {settings?.website}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
};

export default ProposalTemplateBackground;
