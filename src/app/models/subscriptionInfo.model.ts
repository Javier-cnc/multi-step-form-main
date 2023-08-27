export class SubscriptionInfo {
  name: string = '';
  email: string = '';
  phoneNumber: string = '';
  plans: SubscriptionPlan[] = [];
  isYearly: boolean = false;
  adds: Add[] = [];
}

export class SubscriptionPlan {
  name: string = '';
  pricePerMonth: number = 0;
  pricePerYear: number = 0;
  iconAddress: string = '';
  freeMonthQuantity: number = 0;
  selected: boolean = false;
}

export class Add {
  name: string = '';
  selected: boolean = false;
  nameText: string = '';
  description: string = '';
  pricePerYear: number = 0;
  pricePerMonth: number = 0;
}
