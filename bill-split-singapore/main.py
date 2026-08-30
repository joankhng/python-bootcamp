print("Singapore restaurant bill splitter based on 9% GST and 10% service charge")
base_bill = float(input("What was the base bill amount? $\n"))
pax = int(input("How many people are splitting the bill?\n"))

# In Singapore, a 10% service charge is typically applied first.
service_charge_rate = 0.10
# The GST rate is 9%, applied to the subtotal (base bill + service charge).
gst_rate = 0.09

subtotal = base_bill * (1 + service_charge_rate)
total_bill = subtotal * (1 + gst_rate)

# Alternatively, you can use the direct 1.199 multiplier:
# total_bill = base_bill * 1.199

total_per_pax = total_bill / pax

print(f"Each person should pay: ${total_per_pax:.2f}")
