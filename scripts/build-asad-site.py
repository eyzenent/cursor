#!/usr/bin/env python3
"""Build ASAD portal website from Stitch export HTML files."""

import os
import re
import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "asad-portal" / "stitch_asad_strategic_research_portal"
OUTPUT = ROOT / "docs"

PAGES = {
    "asad_ana_sayfa": ("index.html", "Ana Sayfa"),
    "hakk_m_zda": ("hakkimizda.html", "Hakkımızda"),
    "asad_t_z": ("tuzuk.html", "Tüzük"),
    "y_netim_kurulu_1": ("yonetim-kurulu.html", "Yönetim Kurulu"),
    "y_netim_kurulu_2": ("yonetim-kurulu-detay.html", "Yönetim Kurulu Detay"),
    "ara_t_rma_birimleri_1": ("arastirma-birimleri.html", "Araştırma Birimleri"),
    "ara_t_rma_birimleri_2": ("arastirma-detay.html", "Araştırma Detay"),
    "stratejik_raporlar": ("stratejik-raporlar.html", "Stratejik Raporlar"),
    "rapor_detay_sayfas": ("rapor-detay.html", "Rapor Detay"),
    "yay_nlar_ve_k_t_phane_1": ("yayinlar.html", "Yayınlar"),
    "yay_nlar_ve_k_t_phane_2": ("kutuphane.html", "Kütüphane"),
    "haber_ar_ivi": ("haberler.html", "Haber Arşivi"),
    "etkinlik_takvimi": ("etkinlikler.html", "Etkinlik Takvimi"),
    "medya_merkezi": ("medya.html", "Medya Merkezi"),
    "diaspora_haritas": ("diaspora.html", "Diaspora Haritası"),
    "akademik_al_ma_gruplar": ("akademik-gruplar.html", "Akademik Çalışma Grupları"),
    "akademik_a_rehberi": ("akademik-rehber.html", "Akademik Rehber"),
    "akademik_i_birli_i_s_re_leri": ("akademik-isbirligi.html", "Akademik İş Birliği"),
    "akademik_ba_vuru_formu": ("akademik-basvuru.html", "Akademik Başvuru"),
    "yelik_ba_vuru_formu": ("uyelik-basvuru.html", "Üyelik Başvuru"),
    "i_leti_im_sayfas": ("iletisim.html", "İletişim"),
    "kullan_c_paneli": ("panel.html", "Kullanıcı Paneli"),
    "profil_d_zenleme": ("profil.html", "Profil Düzenleme"),
}

NAV_ITEMS = [
    ("index.html", "home", "Home", "Ana Sayfa"),
    ("stratejik-raporlar.html", "article", "Reports", "Raporlar"),
    ("yonetim-kurulu.html", "groups", "Leaders", "Liderler"),
    ("haberler.html", "newspaper", "News", "Haberler"),
    ("sayfalar.html", "menu", "Menu", "Menü"),
]

NAV_SCRIPT = """
<script>
document.querySelectorAll('nav.fixed.bottom-0 div, nav.fixed.bottom-0 a').forEach(tab => {
    tab.addEventListener('click', function(e) {
        if (this.tagName === 'A') return;
        document.querySelectorAll('nav.fixed.bottom-0 > a, nav.fixed.bottom-0 > div').forEach(t => {
            t.classList.remove('active-tab');
            t.classList.add('text-on-surface-variant');
            const icon = t.querySelector('.material-symbols-outlined');
            if (icon) icon.style.fontVariationSettings = "'FILL' 0";
        });
        this.classList.add('active-tab');
        this.classList.remove('text-on-surface-variant');
        const activeIcon = this.querySelector('.material-symbols-outlined');
        if (activeIcon) activeIcon.style.fontVariationSettings = "'FILL' 1";
    });
});
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (!header) return;
    if (window.scrollY > 20) header.classList.add('shadow-md');
    else header.classList.remove('shadow-md');
});
</script>
"""


def build_bottom_nav(current_file: str) -> str:
    items = []
    for href, icon, label_en, _label_tr in NAV_ITEMS:
        is_active = href == current_file
        fill = "'FILL' 1" if is_active else "'FILL' 0"
        active_class = "active-tab text-secondary" if is_active else "text-on-surface-variant"
        items.append(
            f'<a href="{href}" class="{active_class} flex flex-col items-center justify-center pt-2 hover:text-secondary transition-all active:scale-95 duration-200 no-underline">'
            f'<span class="material-symbols-outlined" style="font-variation-settings: {fill};">{icon}</span>'
            f'<span class="font-label-caps text-[10px] mt-1">{label_en}</span></a>'
        )
    return (
        '<nav class="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 pb-4 h-20 '
        'bg-surface dark:bg-inverse-surface shadow-[0_-4px_12px_rgba(11,31,58,0.04)] rounded-t-xl z-50">\n'
        + "\n".join(items)
        + "\n</nav>"
    )


def replace_bottom_nav(html: str, current_file: str) -> str:
    pattern = re.compile(
        r"<nav class=\"fixed bottom-0[\s\S]*?</nav>",
        re.MULTILINE,
    )
    return pattern.sub(build_bottom_nav(current_file), html, count=1)


def inject_nav_script(html: str) -> str:
    if "nav.fixed.bottom-0" in html and NAV_SCRIPT.strip() not in html:
        return html.replace("</body>", NAV_SCRIPT + "\n</body>")
    return html


def make_logo_link(html: str) -> str:
    return re.sub(
        r'(<header[^>]*>[\s\S]*?<img alt="ASAD Logo"[^>]*>)',
        r'<a href="index.html" class="flex items-center gap-2 no-underline">\1</a>',
        html,
        count=1,
    )


def build_sayfalar_html() -> str:
  cards = []
  for folder, (filename, title) in PAGES.items():
      cards.append(
          f'<a href="{filename}" class="block bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-5 hover:shadow-md hover:border-secondary/40 transition-all no-underline">'
          f'<h3 class="font-headline-sm text-headline-sm text-primary mb-1">{title}</h3>'
          f'<p class="font-body-md text-on-surface-variant text-sm">{filename}</p></a>'
      )

  return f"""<!DOCTYPE html>
<html class="light" lang="tr">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>ASAD - Tüm Sayfalar</title>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script id="tailwind-config">
tailwind.config = {{
  darkMode: "class",
  theme: {{
    extend: {{
      colors: {{
        primary: "#000615",
        secondary: "#006973",
        background: "#f7f9fc",
        "on-background": "#191c1e",
        "on-surface-variant": "#44474d",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c4c6ce",
        "primary-container": "#0b1f3a",
        "on-primary-container": "#7587a7",
        "secondary-fixed": "#93f1ff",
        surface: "#f7f9fc"
      }},
      fontFamily: {{
        "headline-md": ["Poppins"],
        "headline-sm": ["Poppins"],
        "body-md": ["Inter"],
        "label-caps": ["Inter"]
      }},
      fontSize: {{
        "headline-md": ["32px", {{"lineHeight": "1.2", "fontWeight": "600"}}],
        "headline-sm": ["24px", {{"lineHeight": "1.3", "fontWeight": "600"}}],
        "body-md": ["16px", {{"lineHeight": "1.6", "fontWeight": "400"}}],
        "label-caps": ["12px", {{"lineHeight": "1.0", "letterSpacing": "0.1em", "fontWeight": "600"}}]
      }}
    }}
  }}
}};
</script>
<style>
.material-symbols-outlined {{ font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }}
.active-tab {{ border-top: 2px solid #006973; color: #006973 !important; }}
</style>
</head>
<body class="bg-background text-on-background font-body-md min-h-screen pb-24">
<header class="fixed top-0 w-full z-50 border-b border-outline-variant/30 bg-surface/80 backdrop-blur-xl h-16 flex justify-between items-center px-4">
<a href="index.html" class="flex items-center gap-2 no-underline">
<img alt="ASAD Logo" class="h-10 w-auto" src="assets/logo.png"/>
<span class="font-headline-sm text-headline-sm font-semibold text-primary">ASAD</span>
</a>
</header>
<main class="pt-24 px-4 max-w-3xl mx-auto">
<h1 class="font-headline-md text-headline-md text-primary mb-2">Site Haritası</h1>
<p class="font-body-md text-on-surface-variant mb-8">ASAD Stratejik Araştırmalar Portalı — tüm sayfalar</p>
<div class="grid gap-4 sm:grid-cols-2">
{''.join(cards)}
</div>
</main>
{build_bottom_nav("sayfalar.html")}
{NAV_SCRIPT}
</body>
</html>"""


def main() -> None:
    if OUTPUT.exists():
        shutil.rmtree(OUTPUT)
    OUTPUT.mkdir(parents=True)
    assets = OUTPUT / "assets"
    assets.mkdir()

    logo_src = SOURCE / "asad_kurumsal_logo" / "screen.png"
    if logo_src.exists():
        shutil.copy(logo_src, assets / "logo.png")

    for folder, (filename, _title) in PAGES.items():
        src = SOURCE / folder / "code.html"
        if not src.exists():
            print(f"Skipping missing: {src}")
            continue
        html = src.read_text(encoding="utf-8")
        html = replace_bottom_nav(html, filename)
        html = inject_nav_script(html)
        html = make_logo_link(html)
        # Use local logo where google hosted logo is used
        html = html.replace(
            "https://lh3.googleusercontent.com/aida-public/AB6AXuA6zQIOhmKBT2hTAmXTsMXzxdteSVLFqOhzt4wwgIgQU3TbA0VJq4mLhZETpDcI0NusNxb-WQ394p20mHWddyCGuQVRHcFHtNesQc4OcK91tzNe0FAg6vIb3n_Yvg4szW-EwIMrjdrzPXrJBLuvgCDZBq6Vbw9e-hTNELoC8m2R0Hh3y9sURuIgEg0yGYPhpCiGOj3Rldqwro6KuTlgBcAmX_0oZtDMZRBso0cfZjP-T3Qm3oWzLWjTFA",
            "assets/logo.png",
        )
        (OUTPUT / filename).write_text(html, encoding="utf-8")
        print(f"Built {filename}")

    (OUTPUT / "sayfalar.html").write_text(build_sayfalar_html(), encoding="utf-8")
    print("Built sayfalar.html")
    print(f"Done — {len(list(OUTPUT.glob('*.html')))} pages in {OUTPUT}")


if __name__ == "__main__":
    main()
