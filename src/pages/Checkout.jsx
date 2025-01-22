export default function Checkout() {
    const handleSubmit = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const data = {
        name: formData.get("name"),
        surname: formData.get("surname"),
        phone: formData.get("phone"),
        address: formData.get("address"),
      };
      console.log("Checkout Data:", data);
      // Handle form submission (e.g., send data to backend or save in localStorage)
    };
  
    return (
      <div className="container mx-auto p-5 max-w-md">
        <h1 className="text-2xl font-bold mb-5">Checkout</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Name Field */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Name</span>
            <input
              type="text"
              name="name"
              className="input input-bordered"
              placeholder="Enter your name"
              required
            />
          </label>
  
          {/* Surname (Prénom) Field */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Surname</span>
            <input
              type="text"
              name="surname"
              className="input input-bordered"
              placeholder="Enter your surname"
              required
            />
          </label>
  
          {/* Phone Number Field */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Phone Number</span>
            <input
              type="tel"
              name="phone"
              className="input input-bordered"
              placeholder="Enter your phone number"
              required
            />
          </label>
  
          {/* Address Field */}
          <label className="flex flex-col">
            <span className="mb-1 font-medium">Address</span>
            <textarea
              name="address"
              className="textarea textarea-bordered"
              placeholder="Enter your address"
              rows="3"
              required
            ></textarea>
          </label>
  
          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
  