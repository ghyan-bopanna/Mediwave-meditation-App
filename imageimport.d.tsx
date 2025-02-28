// TypeScript not recognizing the image file types by default, so we need to declare them here
declare module "*.jpg";
declare module "*.png";
declare module "*.jpeg";
declare module "*.mp4";
declare module "*.ttf" {
  const value: any;
  export default value;
}
