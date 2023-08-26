export class SubscriptionInfo {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  plan: SubscriptionPlan = new SubscriptionPlan();
  Adds: Add[] = [];
}

export class SubscriptionPlan {
  name: string = '';
  pricePerMonth: number = 0;
  pricePerYear: number = 0;
  isYearly: boolean = false;
}

export class Add {
  name: string = '';
  pricePerYear: number = 0;
  pricePerMonth: number = 0;
}
