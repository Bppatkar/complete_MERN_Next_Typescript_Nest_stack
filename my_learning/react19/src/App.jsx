import { useContext, useState } from 'react';
import { DataContext } from './context/Context';
import State from './State';
import Clock from './Clock';
import FormStatus from './hooks/useFormStatus/FormStatus';
import UseTransitionHook from './hooks/UseTransitionHook';
import UseActionStateHook from './hooks/useActionStateHook';

function App() {
  const data = useContext(DataContext);
  const [color, setColor] = useState(null);
  return (
    <>
      <h1>Hello React 19</h1>
      <h2>Bank Balance :- {data}</h2>
      {/* <State /> */}
      <br />
      {/* <select
        name="color"
        id="color"
        defaultValue={'red'}
        onChange={(e) => setColor(e.target.value)}
      >
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
        <option value="yellow">Yellow</option>
        <option value="purple">Purple</option>
      </select> */}
      {/* <Clock color={color} /> */}
      {/* <FormStatus /> */}
      {/* <UseTransitionHook /> */}
      <UseActionStateHook />
    </>
  );
}

// For basic styling
/* 
const products = [
  { id: 1, name: 'Laptop', description: 'Powerful laptop', price: 1200 },
  { id: 2, name: 'Mouse', description: 'Wireless gaming mouse', price: 50 },
  { id: 3, name: 'Keyboard', description: 'Mechanical keyboard', price: 100 },
];

function App() {
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleEditClick = (product) => {
    setEditingProduct(product); // Store the product being edited
    setFormData({
      // Populate form fields
      name: product.name,
      description: product.description,
      price: product.price,
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingProduct) {
      console.log('Updating product:', editingProduct.id, formData);
      // Here you would typically send an API request to update the product on the server.
      // For this example, we'll just log it.
      alert(
        `Product ${editingProduct.name} updated to: Name: ${formData.name}, Description: ${formData.description}, Price: $${formData.price}`
      );
      setEditingProduct(null); // Clear editing state
      setFormData({ name: '', description: '', price: '' }); // Clear form
    }
  };

  return (
    <div className="App">
      <h1>Product List</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            {product.name} - ${product.price}
            <button onClick={() => handleEditClick(product)}>Edit</button>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="edit-form">
          <h2>Edit Product: {editingProduct.name}</h2>
          <form onSubmit={handleSubmit}>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label>
              Description:
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
              ></textarea>
            </label>
            <label>
              Price:
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Update</button>
            <button onClick={() => setEditingProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
} */
export default App;
