import { apiVersion } from "./axios-config";

export default  {
    auth: `${apiVersion}/auth`,
    users: `${apiVersion}/users`,
    cards: `${apiVersion}/cards`,
    walletAccounts: `${apiVersion}/wallet-accounts`,
    payments: `${apiVersion}/payments`,
    charges: `${apiVersion}/charges`,
    //rates: `${apiVersion}/rates`,
    transactions: `${apiVersion}/transactions`,
    virtualCards: `${apiVersion}/virtual-cards`,
    productServices: `${apiVersion}/product-services`,
    serviceProviders: `${apiVersion}/service-providers`,
    conversionRates: `${apiVersion}/conversion-rates` //currency conversion rates
};