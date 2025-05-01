import type { Attribute, Schema } from '@strapi/strapi';

export interface FooterAbout extends Schema.Component {
  collectionName: 'components_footer_abouts';
  info: {
    displayName: 'About';
    icon: 'alien';
  };
  attributes: {
    link: Attribute.Component<'footer.link', true>;
  };
}

export interface FooterInfo extends Schema.Component {
  collectionName: 'components_footer_infos';
  info: {
    displayName: 'info';
    icon: 'alien';
  };
  attributes: {
    destinations: Attribute.Text;
    logo: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
  };
}

export interface FooterLink extends Schema.Component {
  collectionName: 'components_footer_links';
  info: {
    displayName: 'link';
    icon: 'alien';
  };
  attributes: {
    label: Attribute.String;
    link: Attribute.String;
  };
}

export interface FooterSocial extends Schema.Component {
  collectionName: 'components_footer_socials';
  info: {
    displayName: 'social';
    icon: 'alien';
  };
  attributes: {
    email: Attribute.String;
    fb: Attribute.String;
    insta: Attribute.String;
    phone: Attribute.String;
    tiktok: Attribute.String;
    zalo: Attribute.String;
  };
}

export interface FooterTakeCareCustomer extends Schema.Component {
  collectionName: 'components_footer_take_care_customers';
  info: {
    displayName: 'Take care customer';
    icon: 'alien';
  };
  attributes: {
    link: Attribute.Component<'footer.link', true>;
  };
}

export interface HeaderDanhMucChiTiet extends Schema.Component {
  collectionName: 'components_header_danh_muc_chi_tiets';
  info: {
    description: '';
    displayName: 'Danh m\u1EE5c chi ti\u1EBFt';
    icon: 'alien';
  };
  attributes: {
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    isHome: Attribute.Boolean & Attribute.DefaultTo<false>;
    san_phams: Attribute.Relation<
      'header.danh-muc-chi-tiet',
      'oneToMany',
      'api::san-pham.san-pham'
    >;
    slug: Attribute.String & Attribute.Required;
    subTitle: Attribute.String;
    title: Attribute.String;
  };
}

export interface HeaderDanhMucCon extends Schema.Component {
  collectionName: 'components_header_danh_muc_cons';
  info: {
    description: '';
    displayName: 'Danh m\u1EE5c con';
    icon: 'alien';
  };
  attributes: {
    danh_muc_chi_tiet: Attribute.Component<'header.danh-muc-chi-tiet', true>;
    seo: Attribute.Component<'share.seo'>;
    slug: Attribute.String;
    title: Attribute.String;
  };
}

export interface HeaderVideo extends Schema.Component {
  collectionName: 'components_header_videos';
  info: {
    displayName: 'video';
    icon: 'alien';
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    description: Attribute.String;
    linkVideo: Attribute.Text;
    title: Attribute.String;
  };
}

export interface HomeContentCoutdown extends Schema.Component {
  collectionName: 'components_home_content_coutdowns';
  info: {
    description: '';
    displayName: 'content_coutdown';
    icon: 'alien';
  };
  attributes: {
    percent: Attribute.String;
    subtitle: Attribute.String;
    title: Attribute.String;
  };
}

export interface ShareItemCollection extends Schema.Component {
  collectionName: 'components_share_item_collections';
  info: {
    description: '';
    displayName: 'ItemCollection';
  };
  attributes: {
    description: Attribute.String;
    image: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    llink: Attribute.String;
    san_phams: Attribute.Relation<
      'share.item-collection',
      'oneToMany',
      'api::san-pham.san-pham'
    >;
    title: Attribute.String;
  };
}

export interface ShareItemOrder extends Schema.Component {
  collectionName: 'components_share_item_orders';
  info: {
    description: '';
    displayName: 'ItemOrder';
  };
  attributes: {
    amount: Attribute.Integer;
    idCart: Attribute.Integer;
    noted: Attribute.Text;
    price: Attribute.Float;
    san_pham: Attribute.Relation<
      'share.item-order',
      'oneToOne',
      'api::san-pham.san-pham'
    >;
    size: Attribute.String;
  };
}

export interface ShareItemPayment extends Schema.Component {
  collectionName: 'components_share_item_payments';
  info: {
    displayName: 'itemPayment';
    icon: 'alien';
  };
  attributes: {
    content: Attribute.Text;
    imageBank: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    nameBank: Attribute.String;
    note: Attribute.Text;
    numberBank: Attribute.String;
    QR_code: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
  };
}

export interface ShareLinkShop extends Schema.Component {
  collectionName: 'components_share_link_shops';
  info: {
    description: '';
    displayName: 'Link Shop';
    icon: 'alien';
  };
  attributes: {
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link: Attribute.String;
    name: Attribute.String;
    type: Attribute.String;
  };
}

export interface ShareSeo extends Schema.Component {
  collectionName: 'components_share_seos';
  info: {
    description: '';
    displayName: 'seo';
    icon: 'alien';
  };
  attributes: {
    description: Attribute.String;
    keyword: Attribute.Text;
    thumbnail: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
  };
}

export interface ShareSize extends Schema.Component {
  collectionName: 'components_share_sizes';
  info: {
    description: '';
    displayName: 'size';
  };
  attributes: {
    price: Attribute.Integer;
    size: Attribute.String;
  };
}

export interface ShareWhyItem extends Schema.Component {
  collectionName: 'components_share_why_items';
  info: {
    displayName: 'why item';
    icon: 'alien';
  };
  attributes: {
    description: Attribute.Text;
    icon: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'footer.about': FooterAbout;
      'footer.info': FooterInfo;
      'footer.link': FooterLink;
      'footer.social': FooterSocial;
      'footer.take-care-customer': FooterTakeCareCustomer;
      'header.danh-muc-chi-tiet': HeaderDanhMucChiTiet;
      'header.danh-muc-con': HeaderDanhMucCon;
      'header.video': HeaderVideo;
      'home.content-coutdown': HomeContentCoutdown;
      'share.item-collection': ShareItemCollection;
      'share.item-order': ShareItemOrder;
      'share.item-payment': ShareItemPayment;
      'share.link-shop': ShareLinkShop;
      'share.seo': ShareSeo;
      'share.size': ShareSize;
      'share.why-item': ShareWhyItem;
    }
  }
}
