export const theme = {
  // Background
  root_background: "bg-[#F0F4F8]",
  // root_background: "bg-[#faf9f2]",
  // root_background:
  // "bg-gradient-to-b from-sky-700 to-white via-white via-10%",
  // root_background:
  //   "bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a]",
  // header_background: "bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-2xl border-b border-white/10 shadow-lg",
  header_background: "backdrop-blur-md bg-[#21397D] shadow-md",
  // footer_background: "backdrop-blur-md bg-[#0f172a]/80 shadow-lg", // OLD OLD OLD
  footer_background: "backdrop-blur-md bg-[#21397D] shadow-md",
  logo_background: "bg-gradient-to-br from-blue-500 to-cyan-500",
  background_guest_small_card:
    "inline-flex items-center bg-white/10 border border-white/20 rounded-full px-6 py-2 mb-8 backdrop-blur",

  background_result_filter:
    "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white py-1 px-2 rounded-full text-sm ",

  // EFFECTS
  effects: {
        dot_matrix: "bg-[radial-gradient(rgba(11,94,168,0.18)_2px,transparent_2px)] [background-size:2.5rem_2.5rem]",
        neon_glow: "bg-[radial-gradient(circle,rgba(11,94,168,0.35)_100%,transparent_100%)] blur-[100px]",
  },
  //``

  // CARD LANDING / FEATURE STYLE
    card_landing: "group bg-white/70 backdrop-blur-md border border-white/50 rounded-2xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgba(11,94,168,0.06)] hover:border-[#0B5EA8]/20 hover:bg-white/90 transform hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between",

    card_landing_icon_wrapper: "w-12 h-12 bg-[#0B5EA8]/5 rounded-xl flex items-center justify-center mb-5 group-hover:bg-[#0B5EA8] group-hover:text-white transition-all duration-300 shadow-inner",

    card_landing_icon_inner: "group-hover:scale-110 transition-transform duration-300 text-[#0B5EA8] group-hover:text-white",

    card_landing_title: "text-lg font-bold text-slate-800 mb-2 tracking-tight",

    card_landing_description: "text-sm text-slate-500 text-justify leading-relaxed font-medium",

    // Tambahkan ke dalam objek theme
    card_stat: "bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(11,94,168,0.03)] flex flex-col justify-between items-center text-center group hover:border-[#0B5EA8]/20 transition-all duration-300 hover:scale-[1.02]",

  // ...

  // HERO
  // Tambahkan ke dalam objek theme
  hero_badge: "inline-flex items-center bg-white/80 border border-slate-200/80 rounded-full px-5 py-1.5 mb-8 backdrop-blur shadow-sm hover:border-[#0B5EA8]/30 transition-all",
  hero_heading: "text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight mb-6 leading-[1.15]",
  hero_description: "text-lg md:text-xl text-slate-500 mb-14 max-w-2xl mx-auto leading-relaxed font-medium italic",
  text_gradient: "bg-gradient-to-r from-[#0B5EA8] to-cyan-600 bg-clip-text text-transparent",


 // status
 // Di dalam theme.ts
 status_warning: "bg-amber-500/10 border border-amber-500/30 text-amber-900 p-6 rounded-2xl max-w-3xl shadow-sm relative z-10 font-medium",

  // TOP BAR SIDEBAR
  background_top_bar: "bg-[#EBF4FF]",

  // Button - Effect's & Detail
  button_square_pressed_blue_mobile:
    "w-full block text-center bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white px-6 py-3 rounded-full",
  button_square_pressed_blue:
    "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 px-6 py-2 rounded-md hover:brightness-110 transition-all duration-300",
  button_pressed_blue:
    "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 hover:brightness-110 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300",

  // Button-Functional
  button_add:
    "px-4 py-2 bg-gray-400 hover:bg-gray-400/90 backdrop-blur-lg text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2 mr-6 mt-4", // general, di detail atau di edit
  button_reset:
    "px-4 py-2 bg-gray-400 hover:bg-gray-400/90 backdrop-blur-lg text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2", // general untuk reset
  button_filter:
    "px-4 py-2 bg-gray-400 hover:bg-gray-400/90 backdrop-blur-lg text-white cursor-pointer rounded-lg transition-colors duration-200 flex items-center gap-2 mr-6 mt-2",
  button_selection:
    "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-500 text-white", // buat efek kalo di selection gitu buat milih jurusan di admin/matakuliah
  button_cancel:
    "cursor-pointer inline-flex items-center gap-1 rounded-lg border border-red-400 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-400/10  transition-all duration-300 ease-in-out transform", // kalo mau cancle
  button_save:
    "hover:bg-gray-400/10 transition-all duration-500 ease-in-out transform text-blue-300 cursor-pointer inline-flex items-center gap-1 rounded-lg border px-4 py-2 text-sm font-semibold ", // buat popup

  // button kecil buat numbering di absensi dan cari matkul.
  button_default_small:
    "bg-sky-500 text-white font-bold p-2 border-2 border-white/80", // kalo di pilih
  button_default_small_reversed: "bg-white/5 text-sky-400 hover:bg-white/20", // kalo ga dipilih :'(

  // buat button next sama previous, ada di /oprec -> bagian  buat nyari matkul
  button_previous:
    "cursor-pointer flex items-center px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
  button_next:
    "cursor-pointer flex items-center px-3 py-2 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",
  // "cursor-pointer flex items-center px-3 py-2 text-sm font-medium text-gray-300 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200",

  // Text
  text_gradasi_cyan_sky:
    "bg-gradient-to-r from-cyan-300 to-sky-400 bg-clip-text text-transparent",
  text_landing:
    "bg-gradient-to-r from-blue-300 to-blue-500 bg-clip-text text-transparent",
  text_default: "text-slate-600", // versi BG WHITE
  text_default_light: "text-gray-400",
  // text_default: "text-slate-300",

  text_default_blue: "text-blue-300",
  text_title: "text-slate-700 group-hover:text-[#0B5EA8] transition-colors",
  text_fmipa: "text-[#0B5EA8]",
  text_card: "text-[#F0F4F8]",

  // Card
  card_default:
    "bg-white/60 backdrop-blur-md border border-white/60 rounded-2xl p-5 shadow-[0_4px_20px_rgba(11,94,168,0.03)] flex flex-col justify-between group hover:border-[#0B5EA8]/20 transition-all duration-300 hover:scale-[1.02]",
  card_background:
    "bg-gradient-to-tr from-[#0B5EA8]/90 via-[#0B5EA8]/95 to-[#0B5EA8]/80 backdrop-blur-md border border-white/25",
  card_sub_background:
    "p-4", // "bg-gradient-to-tr from-gray-400/40 via-white/5 to-gray-600/40 hover:bg-gray-500/40 border border-white/20 rounded-xl p-4 backdrop-blur-lg transition-all duration-300", // ada di sub-card, di admin/asdos/kelas/detail/id
  card_hover:
    "hover:-translate-y-1 hover:border-white/40 hover:bg-[#0B5EA8] transition-all duration-300",

  card_max_4_fit: "max-w-4xl mx-auto lg:ml-16", // default card utama, biar stick ada di edit/detail // usang - fit everywhere
  card_max_4: `border-t border-l border-r rounded-2xl border-blue-300 transition-all duration-300 max-w-4xl mx-auto lg:ml-16`, // default card utama, biar stick ada di edit/detail

  card_modal:
    "bg-gradient-to-tr from-white/5 via-white/10 to-white/5 border border-white/20 backdrop-blur-lg",
  // buat di fitur cangih dan matkul di oprec. ( BG WHITE )
  card_elegant:
    "bg-gray-200 hover:bg-gray-300/90 backdrop-blur-sm border border-white/20 rounded-2xl",
  card_shadow: "shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_8px_32px_rgba(11,94,168,0.15)]",

  // CARD BUAT DI DASHBOARD.
  card_blue:
    "bg-gradient-to-br from-sky-400/10 to-sky-500/10 backdrop-blur-xl border border-sky-400/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105",
  card_green:
    "bg-gradient-to-br from-green-400/10 to-emerald-500/10 backdrop-blur-xl border border-green-400/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105",
  card_purple:
    "bg-gradient-to-br from-purple-400/10 to-purple-500/10 backdrop-blur-xl border border-purple-400/20 rounded-2xl p-6 transition-all duration-300 hover:scale-105",

  // SMALL CARD WARNA WARNI -  used at "/admin/asdos/kelas"
  card_small_blue:
    "bg-wh border border-blue-500/30 rounded-xl p-4",
  card_small_green:
    "bg-gradient-to-r from-green-600/20 to-green-700/20 backdrop-blur-sm border border-green-500/30 rounded-xl p-4",
  card_small_purple:
    "bg-gradient-to-r from-purple-600/20 to-purple-700/20 backdrop-blur-sm border border-purple-500/30 rounded-xl p-4",
  card_small_red:
    "bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-sm border border-red-500/30 rounded-xl p-4",

  // Hover effect
  hover_default:
    "hover:bg-white/10 hover:border-blue-300 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]",
  hover_default_no_scale_bg:
    "hover:border-blue-300 transition-all duration-300 hover:transform hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]",
  // hover_glow_light:"border border-blue-300 transition-all duration-300 hover:bg-white/5",  // dipake kalo mau pinggiran card ada warna biru, dan klo di hover, putih cardnya --
  hover_glow_light: "border border-[#0B5EA8] transition-all duration-300", // dipake kalo mau pinggiran card ada warna biru, dan klo di hover, putih cardnya -- bg white

  // Hightlight
  highlight_search:
    "w-full pl-10 pr-4 py-2 border border-white/60 rounded-lg bg-[#0B5EA8] focus:bg-[#0B5EA8]/80 focus:placeholder-white focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 ease-in-out transform",
  highlight_filter:
    "cursor-pointer w-full px-3 py-2 border border-white/60 rounded-lg bg-[#0B5EA8] focus:bg-[#0B5EA8]/80 text-white/80 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 ease-in-out transform",
  // gaada ukurannya, seperti px py.
  highlight_focus:
    "cursor-pointer w-full border border-white/60 rounded-lg bg-blue-400/40 focus:bg-blue-400/80 text-gray-400 focus:text-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300 ease-in-out transform",

  // Border
  border_default: "border-sky-900", // untuk sidebar
  border_table_default: "border-slate-300", // untuk table literally table -> buat warna garis warna
  border_outside: "border-white/10", // general aja sih

  // Table
  table_header: "bg-[#0B5EA8]",
  // table_highlight: "hover:bg-gray-400/10 transition-all duration-500 ease-in-out transform",
  table_highlight:
    "hover:bg-gray-400/10 transition-all duration-300 ease-in-out transform", // buat bg white

  // Icons - BACK to previous page.
  icon_link:
    "group mb-6 inline-flex items-center gap-2 text-sm text-sky-400 hover:text-blue-300 lg:ml-16",
  icon_arrow_left: "w-5 h-5 transition-transform group-hover:-translate-x-1",
  icon_search: "h-5 w-5 group-focus-within:text-white text-white/80",
  icon_set: "inline w-4 h-4 cursor-pointer",
  // className={`${theme.icon_set} hover:${theme.text_default_blue} `}

  // Status accepted/processing/rejected
  status_accepted: "bg-green-200 text-green-700",
  status_rejected: "bg-red-200 text-red-700",
  status_processing: "bg-blue-200 text-blue-700",

  // add ons

  nav_link_active: "text-white bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.07)] border border-white/10",
  nav_link_inactive: "text-white/80 border border-transparent",
  nav_link_hover: "hover:text-white hover:bg-white/15 hover:border-white/10 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-40",

  nav_dropdown_trigger: "flex items-center space-x-1.5 font-medium transition-all duration-300 px-4 py-2 rounded-full text-sm border border-transparent text-white/80 hover:text-white hover:bg-white/15 hover:border-white/10",
  nav_dropdown_panel: "absolute top-[calc(100%+8px)] left-0 w-64 rounded-2xl bg-[#1e2f61]/90 backdrop-blur-xl border border-white/10 shadow-2xl z-50 p-1.5 transition-all duration-200",
  nav_dropdown_item_active: "text-white bg-white/20 shadow-sm",
  nav_dropdown_item_inactive: "text-white/80 hover:text-white hover:bg-white/10",

  nav_button_login: "text-white px-5 py-2 rounded-full border border-white/20 font-medium text-sm transition-all duration-300 bg-white/5 hover:bg-white/20 hover:border-white/40 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)]",
};
