"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import OrderSummaryPanel from "@/components/checkout/OrderSummaryPanel";
import { MOCK_ADDRESS } from "@/data/products";
import styles from "./page.module.css";

type PaymentMethod = "paypal" | "card" | "crypto" | "apple" | null;

type AddressForm = {
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  phone: string;
};

const SUBTOTAL = 4650;
const DELIVERY = 23;
const TOTAL = SUBTOTAL + DELIVERY;

export default function CheckoutPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<AddressForm>({
    defaultValues: {
      firstName: MOCK_ADDRESS.firstName,
      lastName: MOCK_ADDRESS.lastName,
      address: MOCK_ADDRESS.street,
      address2: "",
      city: MOCK_ADDRESS.city,
      phone: MOCK_ADDRESS.phone,
    },
  });

  function onAddressSubmit() {
    setStep(2);
    setTimeout(() => setStep(3), 600);
  }

  function onConfirmPayment() {
    if (!paymentMethod) return;
    setStep(4);
  }

  function onPlaceOrder() {
    if (paymentMethod === "crypto") {
      router.push(`/payment/crypto?amount=${TOTAL}`);
    }
  }

  function getCtaLabel() {
    if (step === 4) return "Pay with Crypto";
    if (step === 3) return "Confirm Payment Method";
    return "Continue";
  }

  function handleCta() {
    if (step === 1) handleSubmit(onAddressSubmit)();
    else if (step === 2) setStep(3);
    else if (step === 3) onConfirmPayment();
    else onPlaceOrder();
  }

  return (
    <div className={styles.checkoutWrap}>
      {/* Checkout header */}
      <header className={styles.checkoutHeader}>
        <div className={styles.checkoutHeaderInner}>
          <div className={styles.secureLabel}>
            <Lock size={14} />
            <span>Secure checkout</span>
            <span className={styles.adyen}>[Adyen]</span>
          </div>
          <Link href="/" className={styles.checkoutLogo}>FARFETCH</Link>
          <div className={styles.helpLabel}>
            <span>Need help?</span>
            <Phone size={14} />
            <span>+90 538 123 45 67</span>
          </div>
        </div>
      </header>

      <div className={styles.layout}>
        {/* Left column */}
        <div className={styles.left}>

          {/* Step 1: Delivery Address */}
          {step >= 2 ? (
            <div className={styles.confirmedBlock}>
              <div className={styles.confirmedHeader}>
                <span className={styles.checkIcon}>✅</span>
                <span className={styles.confirmedTitle}>Delivery Address</span>
                <button className={styles.editBtn} onClick={() => setStep(1)}>Edit</button>
              </div>
              <div className={styles.confirmedDetail}>
                <p>{MOCK_ADDRESS.firstName} {MOCK_ADDRESS.lastName}</p>
                <p>{MOCK_ADDRESS.street}, {MOCK_ADDRESS.city}</p>
                <p>{MOCK_ADDRESS.country}</p>
              </div>
            </div>
          ) : (
            <section className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Delivery Address</h2>
              <p className={styles.sectionSub}>Add your delivery address</p>
              <p className={styles.required}>*Required fields</p>

              <form onSubmit={handleSubmit(onAddressSubmit)} className={styles.form}>
                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>First name*</label>
                    <input
                      {...register("firstName", { required: true })}
                      className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Last name*</label>
                    <input
                      {...register("lastName", { required: true })}
                      className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Country/region*</label>
                  <div className={styles.selectWrap}>
                    <select className={styles.select}>
                      <option>🇹🇷 Turkey (USD$)</option>
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Address*</label>
                  <input
                    {...register("address", { required: true })}
                    placeholder="Start typing to search your address"
                    className={`${styles.input} ${errors.address ? styles.inputError : ""}`}
                  />
                  <input {...register("address2")} className={styles.input} style={{ marginTop: "0.8rem" }} />
                  <button type="button" className={styles.addLine}>Add another line</button>
                </div>

                <div className={styles.row2}>
                  <div className={styles.field}>
                    <label className={styles.label}>City*</label>
                    <input
                      {...register("city", { required: true })}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>State</label>
                    <input className={styles.input} />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Phone*</label>
                  <div className={styles.phoneRow}>
                    <div className={styles.phoneFlag}>🇰🇼</div>
                    <input
                      {...register("phone")}
                      className={`${styles.input} ${styles.phoneInput}`}
                    />
                  </div>
                  <p className={styles.phoneNote}>Required to ensure a successful delivery</p>
                </div>

                <label className={styles.checkbox}>
                  <input type="checkbox" defaultChecked /> Use as billing address
                </label>
              </form>
            </section>
          )}

          {/* Step 2: Delivery Method (auto-confirm) */}
          {step >= 3 && (
            <div className={styles.confirmedBlock}>
              <div className={styles.confirmedHeader}>
                <span className={styles.checkIcon}>✅</span>
                <span className={styles.confirmedTitle}>Delivery Method</span>
                <button className={styles.editBtn} onClick={() => setStep(2)}>Edit</button>
              </div>
              <div className={styles.confirmedDetail}>
                <p>Standard delivery (Total $23.00)</p>
                <p>📦 Estimated delivery between May 5 – May 6</p>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <section className={styles.formSection}>
              <h2 className={styles.sectionTitle}>Payment</h2>
              <p className={styles.sectionSub}>Select your payment method</p>

              <div className={styles.paymentGrid}>
                {([
                  { id: "paypal",  label: "PayPal",              icon: "/paypal.svg",     iconW: 80, iconH: 20 },
                  { id: "card",    label: "Debit or credit card", icon: "/mastercard.svg", iconW: 40, iconH: 26 },
                  { id: "apple",   label: "Apple Pay",            icon: "/applepay.svg",   iconW: 58, iconH: 24 },
                  { id: "crypto",  label: "Cryptocurrency",       icon: "/crypto.svg",     iconW: 22, iconH: 36 },
                ] as const).map(({ id, label, icon, iconW, iconH }) => (
                  <button
                    key={id}
                    className={`${styles.paymentCard} ${paymentMethod === id ? styles.paymentSelected : ""}`}
                    onClick={() => setPaymentMethod(id)}
                  >
                    <Image src={icon} alt={label} width={iconW} height={iconH} className={styles.paymentIcon} />
                    <span className={styles.paymentLabel}>{label}</span>
                  </button>
                ))}
              </div>

              {/* Billing address */}
              {paymentMethod && (
                <div className={styles.billingSection}>
                  <p className={styles.billingTitle}>BILLING ADDRESS</p>
                  <div className={styles.billingBox}>
                    <div>
                      <p>{MOCK_ADDRESS.firstName} {MOCK_ADDRESS.lastName}</p>
                      <p>{MOCK_ADDRESS.street}, {MOCK_ADDRESS.city}</p>
                      <p>{MOCK_ADDRESS.country}</p>
                    </div>
                    <button className={styles.editBtn}>Edit</button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Step 4: Order review */}
          {step === 4 && (
            <section className={styles.formSection}>
              <div className={styles.confirmedBlock}>
                <div className={styles.confirmedHeader}>
                  <span className={styles.checkIcon}>✅</span>
                  <span className={styles.confirmedTitle}>Delivery Address</span>
                  <button className={styles.editBtn} onClick={() => setStep(1)}>Edit</button>
                </div>
                <div className={styles.confirmedDetail}>
                  <p>{MOCK_ADDRESS.firstName} {MOCK_ADDRESS.lastName}</p>
                  <p>{MOCK_ADDRESS.street}, {MOCK_ADDRESS.city}, {MOCK_ADDRESS.country}</p>
                </div>
              </div>

              <div className={styles.confirmedBlock}>
                <div className={styles.confirmedHeader}>
                  <span className={styles.checkIcon}>✅</span>
                  <span className={styles.confirmedTitle}>Delivery Method</span>
                  <button className={styles.editBtn} onClick={() => setStep(2)}>Edit</button>
                </div>
                <div className={styles.confirmedDetail}>
                  <p>Standard delivery (Total $23.00)</p>
                  <p>Estimated delivery between May 5 – May 6</p>
                </div>
              </div>

              <div className={styles.confirmedBlock}>
                <div className={styles.confirmedHeader}>
                  <span className={styles.checkIcon}>✅</span>
                  <span className={styles.confirmedTitle}>Payment</span>
                  <button className={styles.editBtn} onClick={() => setStep(3)}>Edit</button>
                </div>
                <div className={styles.confirmedDetail}>
                  <p>Cryptocurrency</p>
                  <p>Billing address Same as Delivery</p>
                </div>
              </div>
            </section>
          )}
        </div>

        {/* Right column — order summary */}
        <div className={styles.right}>
          <OrderSummaryPanel
            ctaLabel={getCtaLabel()}
            onCta={handleCta}
            total={TOTAL}
            subtotal={SUBTOTAL}
            delivery={DELIVERY}
            disabled={step === 3 && !paymentMethod}
          />
        </div>
      </div>
    </div>
  );
}
