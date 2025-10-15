declare module "*.css";
declare module "*.svg" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpg" {
    const content: string;
    export default content;
  }
  
  declare module "*.png" {
    const content: string;
    export default content;
  }
  
  declare module "*.jpeg" {
    const content: string;
    export default content;
  }
  interface ImportMetaEnv {
    readonly WHATSAPP_TOKEN: string;
    readonly WHATSAPP_PHONE_ID: string;
    readonly ADMIN_WHATSAPP: string;
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  