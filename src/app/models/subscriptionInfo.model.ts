export class SubscriptionInfo {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  plan: string = '';
  IsYearly: boolean = false;
  Adds: { name: string; price: number }[] = [];
}
