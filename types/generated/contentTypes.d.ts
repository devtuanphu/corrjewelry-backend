import type { Attribute, Schema } from '@strapi/strapi';

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    description: '';
    displayName: 'Api Token';
    name: 'Api Token';
    pluralName: 'api-tokens';
    singularName: 'api-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    description: '';
    displayName: 'API Token Permission';
    name: 'API Token Permission';
    pluralName: 'api-token-permissions';
    singularName: 'api-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'Permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'Role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    description: '';
    displayName: 'Transfer Token';
    name: 'Transfer Token';
    pluralName: 'transfer-tokens';
    singularName: 'transfer-token';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    expiresAt: Attribute.DateTime;
    lastUsedAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    description: '';
    displayName: 'Transfer Token Permission';
    name: 'Transfer Token Permission';
    pluralName: 'transfer-token-permissions';
    singularName: 'transfer-token-permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'User';
    pluralName: 'users';
    singularName: 'user';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    preferedLanguage: Attribute.String;
    registrationToken: Attribute.String & Attribute.Private;
    resetPasswordToken: Attribute.String & Attribute.Private;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    username: Attribute.String;
  };
}

export interface ApiBangSizeBangSize extends Schema.SingleType {
  collectionName: 'bang_sizes';
  info: {
    displayName: 'B\u1EA3ng size';
    pluralName: 'bang-sizes';
    singularName: 'bang-size';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bang-size.bang-size',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::bang-size.bang-size',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogPageBlogPage extends Schema.SingleType {
  collectionName: 'blog_pages';
  info: {
    displayName: 'BlogPage';
    pluralName: 'blog-pages';
    singularName: 'blog-page';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    banner: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::blog-page.blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::blog-page.blog-page',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBlogBlog extends Schema.CollectionType {
  collectionName: 'blogs';
  info: {
    description: '';
    displayName: 'Blog';
    pluralName: 'blogs';
    singularName: 'blog';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    description: Attribute.Text;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'> & Attribute.Required;
    slug: Attribute.String;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::blog.blog', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiBoSuuTapBoSuuTap extends Schema.SingleType {
  collectionName: 'bo_suu_taps';
  info: {
    description: '';
    displayName: 'B\u1ED9 s\u01B0u t\u1EADp';
    pluralName: 'bo-suu-taps';
    singularName: 'bo-suu-tap';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    content_video: Attribute.Component<'header.video'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::bo-suu-tap.bo-suu-tap',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    item: Attribute.Component<'share.item-collection', true>;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::bo-suu-tap.bo-suu-tap',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCountdownCountdown extends Schema.SingleType {
  collectionName: 'countdowns';
  info: {
    description: '';
    displayName: 'Countdown';
    pluralName: 'countdowns';
    singularName: 'countdown';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::countdown.countdown',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    defaultTim: Attribute.Integer;
    description: Attribute.String;
    percentSale: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    subTitile: Attribute.String;
    time: Attribute.Integer;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::countdown.countdown',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDanhMucTrangChuDanhMucTrangChu
  extends Schema.CollectionType {
  collectionName: 'danh_muc_trang_chus';
  info: {
    description: '';
    displayName: 'Danh m\u1EE5c trang ch\u1EE7';
    pluralName: 'danh-muc-trang-chus';
    singularName: 'danh-muc-trang-chu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::danh-muc-trang-chu.danh-muc-trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    san_phams: Attribute.Relation<
      'api::danh-muc-trang-chu.danh-muc-trang-chu',
      'oneToMany',
      'api::san-pham.san-pham'
    >;
    seo: Attribute.Component<'share.seo'>;
    slug: Attribute.String & Attribute.Required;
    subTitle: Attribute.String;
    title: Attribute.String & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::danh-muc-trang-chu.danh-muc-trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDonHangDonHang extends Schema.CollectionType {
  collectionName: 'don_hangs';
  info: {
    description: '';
    displayName: '\u0110\u01A1n h\u00E0ng';
    pluralName: 'don-hangs';
    singularName: 'don-hang';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    address: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::don-hang.don-hang',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date_order: Attribute.Date;
    email: Attribute.String;
    feeDelivery: Attribute.Integer;
    finalAmount: Attribute.Float;
    firstName: Attribute.String;
    ID_order: Attribute.String & Attribute.Required;
    items: Attribute.Component<'share.item-order', true>;
    lastName: Attribute.String;
    note: Attribute.Text;
    payment_method: Attribute.Enumeration<
      ['Ng\u00E2n h\u00E0ng', 'Momo', 'Thanh to\u00E1n khi nh\u1EADn h\u00E0ng']
    >;
    phone: Attribute.String;
    price_not_reduced: Attribute.Float;
    publishedAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      [
        'Ch\u1EDD x\u00E1c nh\u1EADn',
        '\u0110ang \u0111\u00F3ng g\u00F3i',
        '\u0110ang giao h\u00E0ng',
        '\u0110\u00E3 giao',
        '\u0110\u00E3 hu\u1EF7',
        'Ch\u1EDD duy\u1EC7t hu\u1EF7',
        'Nh\u00E1p'
      ]
    > &
      Attribute.Required &
      Attribute.DefaultTo<'Nh\u00E1p'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::don-hang.don-hang',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::don-hang.don-hang',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
    voucher: Attribute.Relation<
      'api::don-hang.don-hang',
      'oneToOne',
      'api::voucher.voucher'
    >;
  };
}

export interface ApiFeedbackFeedback extends Schema.CollectionType {
  collectionName: 'feedbacks';
  info: {
    description: '';
    displayName: 'feedback';
    pluralName: 'feedbacks';
    singularName: 'feedback';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.Date;
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    publishedAt: Attribute.DateTime;
    san_pham: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'api::san-pham.san-pham'
    >;
    star: Attribute.Integer;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    user: Attribute.Relation<
      'api::feedback.feedback',
      'oneToOne',
      'plugin::users-permissions.user'
    >;
  };
}

export interface ApiFooterFooter extends Schema.SingleType {
  collectionName: 'footers';
  info: {
    displayName: 'Footer';
    pluralName: 'footers';
    singularName: 'footer';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    about: Attribute.Component<'footer.about'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    info: Attribute.Component<'footer.info'>;
    publishedAt: Attribute.DateTime;
    social: Attribute.Component<'footer.social'>;
    take_care: Attribute.Component<'footer.take-care-customer'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGioiThieuGioiThieu extends Schema.SingleType {
  collectionName: 'gioi_thieus';
  info: {
    description: '';
    displayName: 'Gi\u1EDBi thi\u1EC7u';
    pluralName: 'gioi-thieus';
    singularName: 'gioi-thieu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content_become: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    content_trip: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::gioi-thieu.gioi-thieu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.Text;
    img_trip: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    img1: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    imgBig: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    link_shop: Attribute.Component<'share.link-shop', true>;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    subtitle: Attribute.String;
    title: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::gioi-thieu.gioi-thieu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiLienHeLienHe extends Schema.SingleType {
  collectionName: 'lien_hes';
  info: {
    displayName: 'Li\u00EAn H\u1EC7';
    pluralName: 'lien-hes';
    singularName: 'lien-he';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::lien-he.lien-he',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    img: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    shop: Attribute.Component<'share.link-shop', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::lien-he.lien-he',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiNamNam extends Schema.SingleType {
  collectionName: 'nams';
  info: {
    description: '';
    displayName: 'Nam';
    pluralName: 'nams';
    singularName: 'nam';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    content_video: Attribute.Component<'header.video'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::nam.nam', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    danh_muc_con: Attribute.Component<'header.danh-muc-con', true> &
      Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::nam.nam', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiNuNu extends Schema.SingleType {
  collectionName: 'nus';
  info: {
    description: '';
    displayName: 'N\u1EEF';
    pluralName: 'nus';
    singularName: 'nu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    content_video: Attribute.Component<'header.video'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::nu.nu', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    danh_muc_con: Attribute.Component<'header.danh-muc-con', true> &
      Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<'api::nu.nu', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPhiVanChuyenPhiVanChuyen extends Schema.SingleType {
  collectionName: 'phi_van_chuyens';
  info: {
    displayName: 'Ph\u00ED v\u1EADn chuy\u1EC3n';
    pluralName: 'phi-van-chuyens';
    singularName: 'phi-van-chuyen';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::phi-van-chuyen.phi-van-chuyen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    fee: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::phi-van-chuyen.phi-van-chuyen',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSaleOffSaleOff extends Schema.SingleType {
  collectionName: 'sale_offs';
  info: {
    displayName: 'Sale Off';
    pluralName: 'sale-offs';
    singularName: 'sale-off';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::sale-off.sale-off',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::sale-off.sale-off',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiSanPhamSanPham extends Schema.CollectionType {
  collectionName: 'san_phams';
  info: {
    description: '';
    displayName: 'S\u1EA3n ph\u1EA9m';
    pluralName: 'san-phams';
    singularName: 'san-pham';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    amountComment: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::san-pham.san-pham',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    detail: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    feedbacks: Attribute.Relation<
      'api::san-pham.san-pham',
      'oneToMany',
      'api::feedback.feedback'
    >;
    how_to_preserve: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    how_to_use: Attribute.RichText &
      Attribute.CustomField<
        'plugin::ckeditor5.CKEditor',
        {
          preset: 'default';
        }
      >;
    images: Attribute.Media<'images' | 'files' | 'videos' | 'audios', true>;
    isBestSeller: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isNewArrival: Attribute.Boolean & Attribute.DefaultTo<false>;
    isPrenium: Attribute.Boolean &
      Attribute.Required &
      Attribute.DefaultTo<false>;
    isSaleHome: Attribute.Boolean & Attribute.DefaultTo<false>;
    isSalePage: Attribute.Boolean & Attribute.DefaultTo<false>;
    percentSale: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'> & Attribute.Required;
    size: Attribute.Component<'share.size', true>;
    slug: Attribute.String & Attribute.Required;
    startAVG: Attribute.String;
    style: Attribute.Text;
    tag: Attribute.String;
    title: Attribute.String & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::san-pham.san-pham',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiThongTinChuyenKhoanThongTinChuyenKhoan
  extends Schema.SingleType {
  collectionName: 'thong_tin_chuyen_khoans';
  info: {
    displayName: 'Th\u00F4ng tin chuy\u1EC3n kho\u1EA3n';
    pluralName: 'thong-tin-chuyen-khoans';
    singularName: 'thong-tin-chuyen-khoan';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::thong-tin-chuyen-khoan.thong-tin-chuyen-khoan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    item: Attribute.Component<'share.item-payment', true> &
      Attribute.SetMinMax<
        {
          max: 2;
        },
        number
      >;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::thong-tin-chuyen-khoan.thong-tin-chuyen-khoan',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiThongTinLienHeThongTinLienHe extends Schema.CollectionType {
  collectionName: 'thong_tin_lien_hes';
  info: {
    displayName: 'Th\u00F4ng tin li\u00EAn h\u1EC7';
    pluralName: 'thong-tin-lien-hes';
    singularName: 'thong-tin-lien-he';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: Attribute.Text;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::thong-tin-lien-he.thong-tin-lien-he',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    email: Attribute.String;
    name: Attribute.String;
    phone: Attribute.String;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::thong-tin-lien-he.thong-tin-lien-he',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTitleSaleTitleSale extends Schema.SingleType {
  collectionName: 'title_sales';
  info: {
    displayName: 'TitleSale';
    pluralName: 'title-sales';
    singularName: 'title-sale';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content1: Attribute.String;
    content2: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::title-sale.title-sale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::title-sale.title-sale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTrangChuTrangChu extends Schema.SingleType {
  collectionName: 'trang_chus';
  info: {
    description: '';
    displayName: 'Trang ch\u1EE7';
    pluralName: 'trang-chus';
    singularName: 'trang-chu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::trang-chu.trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    img_bestseller: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    slide: Attribute.Component<'share.img', true>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::trang-chu.trang-chu',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiUnisexUnisex extends Schema.SingleType {
  collectionName: 'unisexes';
  info: {
    description: '';
    displayName: 'UNISEX';
    pluralName: 'unisexes';
    singularName: 'unisex';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    avatar: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    content_video: Attribute.Component<'header.video'>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::unisex.unisex',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    danh_muc_con: Attribute.Component<'header.danh-muc-con', true> &
      Attribute.SetMinMax<
        {
          max: 6;
        },
        number
      >;
    publishedAt: Attribute.DateTime;
    seo: Attribute.Component<'share.seo'>;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::unisex.unisex',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiVoucherVoucher extends Schema.CollectionType {
  collectionName: 'vouchers';
  info: {
    displayName: 'Voucher';
    pluralName: 'vouchers';
    singularName: 'voucher';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    code: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::voucher.voucher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    expiry: Attribute.DateTime;
    gia_tri_don_toi_thieu: Attribute.Integer;
    gia_tri_giam: Attribute.Integer;
    publishedAt: Attribute.DateTime;
    so_luong: Attribute.Integer;
    type: Attribute.Enumeration<
      ['Gi\u1EA3m gi\u00E1 theo %', 'Gi\u1EA3m gi\u00E1 tr\u1EF1c ti\u1EBFp']
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::voucher.voucher',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWhyChooseUsWhyChooseUs extends Schema.SingleType {
  collectionName: 'why_choose_uses';
  info: {
    displayName: 'Why Choose Us';
    pluralName: 'why-choose-uses';
    singularName: 'why-choose-us';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::why-choose-us.why-choose-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    item: Attribute.Component<'share.why-item', true>;
    publishedAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'api::why-choose-us.why-choose-us',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    displayName: 'Release';
    pluralName: 'releases';
    singularName: 'release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    status: Attribute.Enumeration<
      ['ready', 'blocked', 'failed', 'done', 'empty']
    > &
      Attribute.Required;
    timezone: Attribute.String;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    displayName: 'Release Action';
    pluralName: 'release-actions';
    singularName: 'release-action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    contentType: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    isEntryValid: Attribute.Boolean;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    collectionName: 'locales';
    description: '';
    displayName: 'Locale';
    pluralName: 'locales';
    singularName: 'locale';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          max: 50;
          min: 1;
        },
        number
      >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginSlugifySlug extends Schema.CollectionType {
  collectionName: 'slugs';
  info: {
    displayName: 'slug';
    pluralName: 'slugs';
    singularName: 'slug';
  };
  options: {
    comment: '';
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    count: Attribute.Integer;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    slug: Attribute.Text;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::slugify.slug',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginStrapiGoogleAuthWithTokenGoogleCredential
  extends Schema.SingleType {
  collectionName: 'google_credentials';
  info: {
    description: '';
    displayName: 'Google Credential';
    pluralName: 'google-credentials';
    singularName: 'google-credential';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    client_id: Attribute.String & Attribute.Required & Attribute.Unique;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::strapi-google-auth-with-token.google-credential',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::strapi-google-auth-with-token.google-credential',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    description: '';
    displayName: 'File';
    pluralName: 'files';
    singularName: 'file';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    alternativeText: Attribute.String;
    caption: Attribute.String;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    ext: Attribute.String;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    height: Attribute.Integer;
    mime: Attribute.String & Attribute.Required;
    name: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    size: Attribute.Decimal & Attribute.Required;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    url: Attribute.String & Attribute.Required;
    width: Attribute.Integer;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    displayName: 'Folder';
    pluralName: 'folders';
    singularName: 'folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    description: '';
    displayName: 'Permission';
    name: 'permission';
    pluralName: 'permissions';
    singularName: 'permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    description: '';
    displayName: 'Role';
    name: 'role';
    pluralName: 'roles';
    singularName: 'role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    description: Attribute.String;
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    type: Attribute.String & Attribute.Unique;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    description: '';
    displayName: 'User';
    name: 'user';
    pluralName: 'users';
    singularName: 'user';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    address: Attribute.Text;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    carts: Attribute.Component<'share.item-order', true>;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    createdAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    date: Attribute.Date;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    firstName: Attribute.String & Attribute.Required;
    lastName: Attribute.String & Attribute.Required;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    phone: Attribute.String;
    picture: Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    provider: Attribute.String;
    resetPasswordToken: Attribute.String & Attribute.Private;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    updatedAt: Attribute.DateTime;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    yeu_thichs: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToMany',
      'api::san-pham.san-pham'
    >;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::permission': AdminPermission;
      'admin::role': AdminRole;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'admin::user': AdminUser;
      'api::bang-size.bang-size': ApiBangSizeBangSize;
      'api::blog-page.blog-page': ApiBlogPageBlogPage;
      'api::blog.blog': ApiBlogBlog;
      'api::bo-suu-tap.bo-suu-tap': ApiBoSuuTapBoSuuTap;
      'api::countdown.countdown': ApiCountdownCountdown;
      'api::danh-muc-trang-chu.danh-muc-trang-chu': ApiDanhMucTrangChuDanhMucTrangChu;
      'api::don-hang.don-hang': ApiDonHangDonHang;
      'api::feedback.feedback': ApiFeedbackFeedback;
      'api::footer.footer': ApiFooterFooter;
      'api::gioi-thieu.gioi-thieu': ApiGioiThieuGioiThieu;
      'api::lien-he.lien-he': ApiLienHeLienHe;
      'api::nam.nam': ApiNamNam;
      'api::nu.nu': ApiNuNu;
      'api::phi-van-chuyen.phi-van-chuyen': ApiPhiVanChuyenPhiVanChuyen;
      'api::sale-off.sale-off': ApiSaleOffSaleOff;
      'api::san-pham.san-pham': ApiSanPhamSanPham;
      'api::thong-tin-chuyen-khoan.thong-tin-chuyen-khoan': ApiThongTinChuyenKhoanThongTinChuyenKhoan;
      'api::thong-tin-lien-he.thong-tin-lien-he': ApiThongTinLienHeThongTinLienHe;
      'api::title-sale.title-sale': ApiTitleSaleTitleSale;
      'api::trang-chu.trang-chu': ApiTrangChuTrangChu;
      'api::unisex.unisex': ApiUnisexUnisex;
      'api::voucher.voucher': ApiVoucherVoucher;
      'api::why-choose-us.why-choose-us': ApiWhyChooseUsWhyChooseUs;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::i18n.locale': PluginI18NLocale;
      'plugin::slugify.slug': PluginSlugifySlug;
      'plugin::strapi-google-auth-with-token.google-credential': PluginStrapiGoogleAuthWithTokenGoogleCredential;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
    }
  }
}
