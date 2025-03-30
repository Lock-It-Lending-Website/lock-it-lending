function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold text-lg mb-3">{title}</h3>
      {children}
    </div>
  );
}

function ThreeOptions({ options }: { options: string[] }) {
  return (
    <div className="flex flex-col md:flex-row gap-4">
      {options.map((opt) => (
        <div key={opt} className="flex-1 border p-4 rounded text-center text-gray-700 hover:shadow-md cursor-pointer">
          {opt}
        </div>
      ))}
    </div>
  );
}

function MultiOptions({ options }: { options: string[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {options.map((opt) => (
        <div key={opt} className="border p-4 rounded text-center text-gray-700 hover:shadow-md cursor-pointer">
          {opt}
        </div>
      ))}
    </div>
  );
}


export default function FullRefinanceForm() {
  return (
    <form className="max-w-3xl mx-auto bg-white shadow-lg p-8 space-y-8">
      <h2 className="text-2xl font-bold text-center">Get Your Custom Rate Quote</h2>

      {/* Goals */}
      <Section title="What are your goals?">
        <ThreeOptions options={["Lower my payment", "Take cash out", "Shorter term"]} />
      </Section>

      {/* State Selection */}
      <Section title="Which state are you shopping in?">
        <select className="w-full p-2 rounded border">
          <option>Select option</option>
          <option>California</option>
          <option>Texas</option>
          {/* Add more */}
        </select>
      </Section>

      {/* Property Usage */}
      <Section title="How's this property used?">
        <ThreeOptions options={["Primary Residence", "Secondary Home", "Investment Property"]} />
      </Section>

      {/* Mortgage Balance */}
      <Section title="Current mortgage balance?">
        <MultiOptions options={["Below 100K", "100K - 174K", "175K - 249K", "250K - 349K", "350K - 549K", "550K - 999K", "1M+"]} />
      </Section>

      {/* Property Value */}
      <Section title="Estimated value of your property?">
        <MultiOptions options={["Below 100K", "100K - 174K", "175K - 249K", "250K - 349K", "350K - 549K", "550K - 999K", "1M+"]} />
      </Section>

      {/* Credit Score */}
      <Section title="Estimated credit score?">
        <MultiOptions options={["740+", "700 - 739", "660 - 699", "600 - 659", "Below 600"]} />
      </Section>

      {/* Home Retention Duration */}
      <Section title="How long do you plan on keeping the home?">
        <MultiOptions options={["Under a year", "1–2", "3–5", "6–9", "10+"]} />
      </Section>

      {/* Language */}
      <Section title="What is your language preference?">
        <MultiOptions options={["English", "Spanish", "Chinese", "Korean", "Tagalog", "Vietnamese", "Arabic", "Albanian", "Other"]} />
      </Section>

      {/* Contact Info */}
      <Section title="Contact Info">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input placeholder="First Name" className="border rounded p-2" />
          <input placeholder="Last Name" className="border rounded p-2" />
        </div>
        <input placeholder="Email" className="border rounded p-2 w-full mt-4" />
        <input placeholder="Phone Number" className="border rounded p-2 w-full mt-4" />
        <div className="mt-4 text-sm text-gray-600">
          <input type="checkbox" className="mr-2" />
          I agree to receive communications per the privacy policy.
        </div>
      </Section>

      {/* Submit */}
      <button type="submit" className="bg-yellow-600 text-white w-full py-3 rounded font-bold">
        Submit
      </button>
    </form>
  );
}
