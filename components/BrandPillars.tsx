import { ShieldCheck, Sparkles, Truck, HeartHandshake } from 'lucide-react';

export default function BrandPillars() {
  const pillars = [
    {
      icon: Sparkles,
      title: 'Grade-A Natural Harvest',
      desc: 'Hand-selected California almonds, Afghan anjeer, Chilean walnuts & cashew nuts with zero artificial polish.',
    },
    {
      icon: HeartHandshake,
      title: 'Curated Artisan Collectibles',
      desc: 'Featuring designer fabrics by Sifti Creations, festive jewel pieces by Güzel & reusable handcrafted brass serveware.',
    },
    {
      icon: Truck,
      title: 'Bespoke Corporate Gifting',
      desc: 'Custom wooden keepsake trunks, laser-engraved company logos, and pan-India doorstep express dispatch.',
    },
    {
      icon: ShieldCheck,
      title: 'Studio & Express Delivery',
      desc: 'Private studio appointments at B21 South City 1, Gurgaon with same-day NCR delivery & pan-India express courier.',
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-y border-[#E8DEC9]/60">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {pillars.map((item, idx) => {
          const Icon = item.icon;
          return (
            <div key={idx} className="flex items-start space-x-3.5 group">
              <div className="p-2.5 rounded-lg bg-[#FAF7F2] border border-[#D4AF37]/30 text-[#0F2E22] group-hover:bg-[#0F2E22] group-hover:text-[#D4AF37] transition-colors shrink-0">
                <Icon className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xs uppercase tracking-wider font-semibold text-[#1C1917]">
                  {item.title}
                </h3>
                <p className="text-[12px] text-[#6E655F] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
