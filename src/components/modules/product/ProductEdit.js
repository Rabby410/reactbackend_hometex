import React, { useEffect, useState } from "react";
import Breadcrumb from "../../partoals/Breadcrumb";
import Constants from "../../../Constants";
import Swal from "sweetalert2";
import CardHeader from "../../partoals/miniComponents/CardHeader";
import { Link, redirect, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { EditorState, ContentState, convertFromHTML, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import Select from "react-select";

const ProductEdit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [attribute_input, setAttribute_input] = useState({});
  const [specification_input, setSpecification_input] = useState({});
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [childSubCategories, setChildSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [addProductData, setAddProductData] = useState([]);
  const [allSubcategories, setAllSubcategories] = useState([]);
  const [allChildSubcategories, setAllChildSubcategories] = useState([]);
  const [countries, setCountries] = useState([]);
  const [shops, setShops] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [attributeFiled, setAttributeField] = useState([]);
  const [attributeFieldId, setAttributeFieldId] = useState(1);
  const [specificationFiled, setSpecificationFiled] = useState([]);
  const [specificationFiledId, setSpecificationFiledId] = useState(1);
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const [selectedShops, setSelectedShops] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [totalStock, setTotalStock] = useState(0);
  const [product, setProduct] = useState([]);
  const [input, setInput] = useState({});

  const getProduct = () => {
    const token = localStorage.getItem("token");
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${Constants.BASE_URL}/product/${params.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .request(config)
      .then((response) => {
        const contentBlocks = convertFromHTML(response.data.data.description);
        const contentState = ContentState.createFromBlockArray(contentBlocks);
        const editorState = EditorState.createWithContent(contentState);
        const costValue = response.data.data.cost.replace(/[৳,]/g, "");
        const priceValue = response.data.data.price.replace(/[৳,]/g, "");
        const shopData = response.data.data.shops;

        // Filter out duplicate shops based on shop_id
        const uniqueShopData = [];
        const shopIds = new Set();

        shopData.forEach((shop) => {
          if (!shopIds.has(shop.shop_id)) {
            uniqueShopData.push(shop);
            shopIds.add(shop.shop_id);
          }
        });
        setEditorState(editorState);
        const discountPercentValue = parseFloat(response.data.data.discount_percent);
        const discountFixedValue = parseFloat(response.data.data.discount_fixed);
        const discountEndDate = new Date(response.data.data.discount_end);
        const formattedDiscountEnd = discountEndDate.toISOString().slice(0, 16);
        const discountStartDate = new Date(response.data.data.discount_start);
        const formattedDiscountStart = discountStartDate.toISOString().slice(0, 16);
        const productAttributes = response.data.data.attributes ? [response.data.data.attributes.id] : [];
        const shopQuantities = {};
        uniqueShopData.forEach((shop) => {
          shopQuantities[shop.shop_id] = shop.shop_quantity;
        });
        setInput({
          shops: uniqueShopData,
          name: response.data.data.name,
          slug: response.data.data.slug,
          category_id: response.data.data.category?.id,
          sub_category_id: response.data.data.sub_category?.id,
          child_sub_category_id: response.data.data.child_sub_category?.id,
          country_id: response.data.data.country?.id,
          brand_id: response.data.data.brand?.id,
          supplier_id: response.data.data.supplier?.id,
          description: editorState,
          cost: costValue ? Number(costValue) : null,
          price: priceValue ? Number(priceValue) : null,
          isFeatured: response.data.data.isFeatured === 1 ? true : false,
          isNew: response.data.data.isNew === 1 ? true : false,
          isTrending: response.data.data.isTrending === 1 ? true : false,
          sku: response.data.data.sku,
          discount_start: formattedDiscountStart,
          discount_end: formattedDiscountEnd,
          discount_fixed: discountFixedValue,
          discount_percent: discountPercentValue,
          price_formula: response.data.data.price_formula,
          field_limit: response.data.data.field_limit,
          status: response.data.data.status == "Active" ?  1 : 0,
        });
        setAttributes(productAttributes);
        // Set the quantities for each shop in the state
        setQuantities(shopQuantities);
        // Pre-select shops
        setSelectedShops(uniqueShopData.map((shop) => ({
          value: shop.shop_id,
          label: shop.shop_name,
        })));
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getProduct();
  }, []);

  // Define shop_quantities variable
  const shop_quantities = selectedShops.map((shop) => ({
    shop_id: shop.value,
    quantity: quantities[shop.value] || 0,
  }));

  useEffect(() => {
    const newTotalStock = Object.values(quantities).reduce(
      (acc, currentQuantity) => acc + currentQuantity,
      0
    );
    setTotalStock(newTotalStock);
  }, [quantities]);

  const onEditorStateChange = (newEditorState) => {
    setEditorState(newEditorState);
    handleInput({
      target: {
        name: "description",
        value: newEditorState.getCurrentContent().getPlainText(),
      },
    });
  };

  const handleCheckbox = (event) => {
    const { name, checked } = event.target;
    setInput((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };

  const handleSpecificationFieldRemove = (id) => {
    setSpecificationFiled((oldValues) =>
      oldValues.filter((specificationFiled) => specificationFiled !== id)
    );
    setSpecification_input((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
    setSpecificationFiledId(specificationFiledId - 1);
  };

  const handleSpecificationFields = (id) => {
    setSpecificationFiledId(specificationFiledId + 1);
    setSpecificationFiled((prevState) => [...prevState, specificationFiledId]);
  };

  const handleAttributeFieldsRemove = (id) => {
    setAttributeField((oldValues) =>
      oldValues.filter((attributeFiled) => attributeFiled !== id)
    );
    setAttribute_input((current) => {
      const copy = { ...current };
      delete copy[id];
      return copy;
    });
    setAttributeFieldId(attributeFieldId - 1);
  };

  const handleAttributeFields = (id) => {
    if (attributes.length >= attributeFieldId) {
      setAttributeFieldId(attributeFieldId + 1);
      setAttributeField((prevState) => [...prevState, attributeFieldId]);
    }
  };

  const handleSpecificationInput = (e, id) => {
    setSpecification_input((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const handleAttributeInput = (e, id) => {
    setAttribute_input((prevState) => ({
      ...prevState,
      [id]: {
        ...prevState[id],
        [e.target.name]: e.target.value,
      },
    }));
  };

  const getAddProductData = () => {
    const token = localStorage.getItem("token");
    axios
      .get(`${Constants.BASE_URL}/get-add-product-data`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setCategories(res.data.categories);
        setBrands(res.data.brands);
        setCountries(res.data.countries);
        setSuppliers(res.data.providers);
        setAttributes(res.data.attributes);
        setAllSubcategories(res.data.sub_categories);
        setAllChildSubcategories(res.data.child_sub_categories);
        setShops(res.data.shops);
      });
  };

  const shopIds = shop_quantities.map((item) => item.shop_id);

  const calculateTotalStock = (shopQuantities) => {
    let totalStock = 0;
    shopQuantities.forEach((shop) => {
      totalStock += parseInt(shop.quantity, 10);
    });
    return totalStock;
  };

  const handleInput = (e) => {
    if (e.target.name === "name") {
      let slug = e.target.value;
      slug = slug.toLowerCase();
      slug = slug.replaceAll(" ", "-");
      setInput((prevState) => ({ ...prevState, slug: slug }));
    } else if (e.target.name === "category_id") {
      let category_id = parseInt(e.target.value);
      if (!Number.isNaN(category_id)) {
        let sub_category = allSubcategories.filter((item, index) => {
          return item.category_id == category_id;
        });
        setSubCategories(sub_category);
        setChildSubCategories([]);
      }
    } else if (e.target.name === "sub_category_id") {
      let sub_category_id = parseInt(e.target.value);
      if (!Number.isNaN(sub_category_id)) {
        let child_sub_category_id = allChildSubcategories.filter(
          (item, index) => {
            return item.sub_category_id == sub_category_id;
          }
        );
        setChildSubCategories(child_sub_category_id);
      }
    }

    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePhoto = (e) => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      setInput((prevState) => ({ ...prevState, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleProductUpdate = () => {
    setIsLoading(true);
    const token = localStorage.getItem("token");

    // Use the shop_quantities variable
    const payload = {
      ...input,
      shop_quantities: shop_quantities,
      stock: totalStock,
      shop_ids: shopIds,
    };

    axios
      .put(`${Constants.BASE_URL}/product/${params.id}`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setIsLoading(false);
        if (res.data.product_id !== undefined) {
          getProduct();
        }
        Swal.fire({
          position: "top-end",
          icon: res.data.cls,
          title: res.data.msg,
          showConfirmButton: false,
          toast: true,
          timer: 1500,
        });
        if (res.data.product_id != undefined) {
          navigate("/product/photo/" + res.data.product_id);
        }
      })
      .catch((errors) => {
        setIsLoading(false);
        if (errors.response.status == 422) {
          setErrors(errors.response.data.errors);
        }
      });
  };

  useEffect(() => {
    getAddProductData();
  }, []);

  useEffect(() => {
    setInput((prevState) => ({ ...prevState, attributes: attribute_input }));
  }, [attribute_input]);

  useEffect(() => {
    setInput((prevState) => ({
      ...prevState,
      specifications: specification_input,
    }));
  }, [specification_input]);

  const handleMulipleSelect = (e) => {
    let value = [];
    for (const item of e) {
      value.push(item.value);
    }
    setInput((prevState) => ({ ...prevState, shop_ids: value }));
  };

  useEffect(() => {
    let total = 0;
    for (const shop of selectedShops) {
      const quantity = quantities[shop.value] || 0;
      total += quantity;
    }
    setTotalStock(total);
  }, [selectedShops, quantities]);

  const handleShopSelect = (selectedOptions) => {
    setSelectedShops(selectedOptions);
  };

  const handleQuantityChange = (event, shopId) => {
    const newQuantities = { ...quantities };
    newQuantities[shopId] = parseInt(event.target.value, 10) || 0;
    setQuantities(newQuantities);
  };

  return (
    <>
      <Breadcrumb title={"Edit Product"} />
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <CardHeader
                title={"Edit Product"}
                link={"/products"}
                icon={"fa-list"}
                button_text={"List"}
              />
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-md-12">
                  <label className="w-100 mt-4">
                    <p>Select Shop(s)</p>
                    <Select
                      isMulti
                      options={shops}
                      onChange={handleShopSelect}
                      placeholder="Select Shop(s)"
                      value={selectedShops}
                    />
                  </label>
                </div>
                {selectedShops.map((shop) => (
                  <div className="col-md-6" key={shop.value}>
                    <label className="w-100 mt-4">
                      <p>Product Stock for {shop.label}</p>
                      <input
                        className="form-control mt-2"
                        type="number"
                        name={`stock_${shop.value}`}
                        value={quantities[shop.value] || ""}
                        onChange={(e) => handleQuantityChange(e, shop.value)}
                        placeholder={`Enter Product Stock for ${shop.label}`}
                      />
                    </label>
                  </div>
                ))}
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Name</p>
                    <input
                      className={
                        errors.name != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type={"text"}
                      name={"name"}
                      value={input.name}
                      onChange={handleInput}
                      placeholder={"Enter Product name"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.name != undefined ? errors.name[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Slug</p>
                    <input
                      className={
                        errors.slug != undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      type={"text"}
                      name={"slug"}
                      value={input.slug}
                      onChange={handleInput}
                      placeholder={"Enter Product slug"}
                    />
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.slug != undefined ? errors.slug[0] : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Category</p>
                    <select
                      className={
                        errors.category_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"category_id"}
                      value={input.category_id || ""}
                      onChange={handleInput}
                      placeholder={"Select product category"}
                    >
                      <option>Select Category</option>
                      {categories.map((category, index) => (
                        <option value={category.id} key={index}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.category_id != undefined
                          ? errors.category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Sub Category</p>
                    <select
                      className={
                        errors.sub_category_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"sub_category_id"}
                      value={input.sub_category_id || ""}
                      onChange={handleInput}
                      placeholder={"Select product sub category"}
                    >
                      <option>Select Sub Category</option>
                      {subCategories.map((sub_category, index) => (
                        <option value={sub_category.id} key={index}>
                          {sub_category.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.sub_category_id != undefined
                          ? errors.sub_category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Child Sub Category</p>
                    <select
                      className={
                        errors.child_sub_category_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"child_sub_category_id"}
                      value={input.child_sub_category_id}
                      onChange={handleInput}
                      placeholder={"Select product child sub category"}
                    >
                      <option>Select Child Sub Category</option>
                      {childSubCategories.map((child_sub_category, index) => (
                        <option value={child_sub_category.id} key={index}>
                          {child_sub_category.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.child_sub_category_id != undefined
                          ? errors.child_sub_category_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Brand</p>
                    <select
                      className={
                        errors.brand_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"brand_id"}
                      value={input.brand_id}
                      onChange={handleInput}
                      placeholder={"Select product brand"}
                    >
                      <option>Select Brand</option>
                      {brands.map((brand, index) => (
                        <option value={brand.id} key={index}>
                          {brand.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.brand_id != undefined
                          ? errors.brand_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Product Origin</p>
                    <select
                      className={
                        errors.country_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"country_id"}
                      value={input.country_id}
                      onChange={handleInput}
                      placeholder={"Select product origin"}
                    >
                      <option>Select Product Origin</option>
                      {countries.map((country, index) => (
                        <option value={country.id} key={index}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.country_id != undefined
                          ? errors.country_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Select Product Supplier</p>
                    <select
                      className={
                        errors.supplier_id != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"supplier_id"}
                      value={input.supplier_id}
                      onChange={handleInput}
                      placeholder={"Select product supplier"}
                    >
                      <option>Select Product Supplier</option>
                      {suppliers.map((supplier, index) => (
                        <option value={supplier.id} key={index}>
                          {supplier.name} - {supplier.phone}
                        </option>
                      ))}
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.supplier_id != undefined
                          ? errors.supplier_id[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>
                <div className="col-md-6">
                  <label className={"w-100 mt-4"}>
                    <p>Status</p>
                    <select
                      className={
                        errors.status != undefined
                          ? "form-select mt-2 is-invalid"
                          : "form-select mt-2"
                      }
                      name={"status"}
                      value={input.status}
                      onChange={handleInput}
                      placeholder={"Select product status"}
                    >
                      <option value={1}>Active</option>
                      <option value={0}>Inactive</option>
                    </select>
                    <p className={"login-error-msg"}>
                      <small>
                        {errors.status != undefined ? errors.status[0] : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="card my-4">
                    <div className="card-header">
                      <h5>Select Product Attribute</h5>
                    </div>
                    <div className="card-body">
                      {attributeFiled.map((id, ind) => (
                        <div
                          key={ind}
                          className="row my-2 align-items-baseline"
                        >
                          <div className="col-md-5">
                            <label className={"w-100 mt-4"}>
                              <p>Select Attribute</p>
                              <select
                                className="form-select mt-2"
                                name={"attribute_id"}
                                value={
                                  attribute_input[id] != undefined
                                    ? attribute_input[id].attribute_id
                                    : null
                                }
                                onChange={(e) => handleAttributeInput(e, id)}
                                placeholder={"Select product attribute"}
                              >
                                <option>Select Attribute</option>
                                {attributes.map((value, index) => (
                                  <option value={value.id}>{value.name}</option>
                                ))}
                              </select>
                              <p className={"login-error-msg"}>
                                <small>
                                  {errors.attribute_id != undefined
                                    ? errors.attribute_id[0]
                                    : null}
                                </small>
                              </p>
                            </label>
                          </div>
                          <div className="col-md-5">
                            <label className={"w-100 mt-4"}>
                              <p>Select Attribute Value</p>
                              <select
                                className={"form-select mt-2"}
                                name={"value_id"}
                                value={
                                  attribute_input[id] != undefined
                                    ? attribute_input[id].value_id
                                    : null
                                }
                                onChange={(e) => handleAttributeInput(e, id)}
                                placeholder={"Select product attribute value"}
                              >
                                <option>Select Attribute Value</option>
                                {attributes.map((value, index) => (
                                  <>
                                    {attribute_input[id] != undefined &&
                                      value.id == attribute_input[id].attribute_id
                                      ? value.value.map(
                                        (atr_value, value_ind) => (
                                          <option value={atr_value.id}>
                                            {atr_value.name}
                                          </option>
                                        )
                                      )
                                      : null}
                                  </>
                                ))}
                              </select>
                              <p className={"login-error-msg"}>
                                <small>
                                  {errors.attribute_id != undefined
                                    ? errors.attribute_id[0]
                                    : null}
                                </small>
                              </p>
                            </label>
                          </div>
                          <div className="col-md-2">
                            {attributeFiled.length - 1 == ind ? (
                              <button
                                className={"btn btn-danger"}
                                onClick={() => handleAttributeFieldsRemove(id)}
                              >
                                <i className="fa-solid fa-minus" />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))}

                      <div className="row">
                        <div className="col-md-12 text-center">
                          <button
                            className={"btn btn-success"}
                            onClick={handleAttributeFields}
                          >
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="card my-4">
                    <div className="card-header">
                      <h5>Product Specifications</h5>
                    </div>
                    <div className="card-body">
                      {specificationFiled.map((id, ind) => (
                        <div
                          key={ind}
                          className="row my-2 align-items-baseline"
                        >
                          <div className="col-md-5">
                            <label className={"w-100 mt-4"}>
                              <p>Specification Name</p>
                              <input
                                className={"form-control mt-2"}
                                type={"text"}
                                name={"name"}
                                value={
                                  specification_input[id] != undefined
                                    ? specification_input[id].name
                                    : null
                                }
                                onChange={(e) =>
                                  handleSpecificationInput(e, id)
                                }
                                placeholder={"Enter Product Specification Name"}
                              />
                              <p className={"login-error-msg"}>
                                <small>
                                  {errors.name != undefined
                                    ? errors.name[0]
                                    : null}
                                </small>
                              </p>
                            </label>
                          </div>
                          <div className="col-md-5">
                            <label className={"w-100 mt-4"}>
                              <p>Specification Value</p>
                              <input
                                className="form-control mt-2"
                                type={"text"}
                                name={"value"}
                                value={
                                  specification_input[id] != undefined
                                    ? specification_input[id].value
                                    : null
                                }
                                onChange={(e) =>
                                  handleSpecificationInput(e, id)
                                }
                                placeholder={"Enter Product Specification Name"}
                              />
                              <p className={"login-error-msg"}>
                                <small>
                                  {errors.name != undefined
                                    ? errors.name[0]
                                    : null}
                                </small>
                              </p>
                            </label>
                          </div>
                          <div className="col-md-2">
                            {specificationFiled.length - 1 == ind ? (
                              <button
                                className={"btn btn-danger"}
                                onClick={() =>
                                  handleSpecificationFieldRemove(id)
                                }
                              >
                                <i className="fa-solid fa-minus" />
                              </button>
                            ) : null}
                          </div>
                        </div>
                      ))}

                      <div className="row">
                        <div className="col-md-12 text-center">
                          <button
                            className={"btn btn-success"}
                            onClick={handleSpecificationFields}
                          >
                            <i className="fa-solid fa-plus" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12 my-4">
                  <div className="card">
                    <div className="card-header">
                      <h5>Product Price and Stock</h5>
                    </div>
                    <div className="card-body">
                      <div className="row">
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Product Cost</p>
                            <input
                              className={
                                errors.cost != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"number"}
                              name={"cost"}
                              value={input.cost}
                              onChange={handleInput}
                              placeholder={"Enter Product Cost"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.cost != undefined
                                  ? errors.cost[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Product Sale Price</p>
                            <input
                              className={
                                errors.price !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type="number"
                              name="price"
                              value={input.price}
                              onChange={handleInput}
                              placeholder="Enter Product Price"
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.price !== undefined
                                  ? errors.price[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-12">
                          <label className="w-100 mt-4">
                            <p>Price Formula</p>
                            <input
                              className={
                                errors.price_formula !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type="text"
                              name="price_formula"
                              value={input.price_formula}
                              onChange={handleInput}
                              placeholder="Enter Product Price Formula"
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.price_formula !== undefined
                                  ? errors.price_formula[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                          <label className="w-100 mt-4">
                            <p>Field Limits (eg l:100-800;w:300-877)</p>
                            <input
                              className={
                                errors.field_limit !== undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type="text"
                              name="field_limit"
                              value={input.field_limit}
                              onChange={handleInput}
                              placeholder="l:0-120;w:0-120"
                            />
                            <p className="login-error-msg">
                              <small>
                                {errors.field_limit !== undefined
                                  ? errors.field_limit[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>

                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Discount %</p>
                            <input
                              className={
                                errors.discount_percent != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"number"}
                              name={"discount_percent"}
                              value={input.discount_percent || ""}
                              onChange={handleInput}
                              placeholder={"Enter Product Discount (%)"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.discount_percent != undefined
                                  ? errors.discount_percent[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Discount Fixed Amount</p>
                            <input
                              className={
                                errors.discount_fixed != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"number"}
                              name={"discount_fixed"}
                              value={input.discount_fixed || ""}
                              onChange={handleInput}
                              placeholder={"Enter Product Discount Fixed"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.discount_fixed != undefined
                                  ? errors.discount_fixed[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Discount Start Date</p>
                            <input
                              className={
                                errors.discount_start != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"datetime-local"}
                              name={"discount_start"}
                              value={input.discount_start || ""}
                              onChange={handleInput}
                              placeholder={"Enter Discount Start Date"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.discount_start != undefined
                                  ? errors.discount_start[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Discount End Date</p>
                            <input
                              className={
                                errors.discount_end != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"datetime-local"}
                              name={"discount_end"}
                              value={input.discount_end || ""}
                              onChange={handleInput}
                              placeholder={"Enter Discount End Date"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.discount_end != undefined
                                  ? errors.discount_end[0]
                                  : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className="w-100 mt-4">
                            <p>Total Product Stock</p>
                            <input
                              className="form-control mt-2"
                              type="number"
                              name="total_stock"
                              value={totalStock}
                              readOnly
                              onChange={(e) => setTotalStock(e.target.value)}
                              placeholder="Total Product Stock"
                            />
                          </label>
                        </div>
                        <div className="col-md-6">
                          <label className={"w-100 mt-4"}>
                            <p>Prouct SKU</p>
                            <input
                              className={
                                errors.sku != undefined
                                  ? "form-control mt-2 is-invalid"
                                  : "form-control mt-2"
                              }
                              type={"text"}
                              name={"sku"}
                              value={input.sku}
                              onChange={handleInput}
                              placeholder={"Enter Product SKU"}
                            />
                            <p className={"login-error-msg"}>
                              <small>
                                {errors.sku != undefined ? errors.sku[0] : null}
                              </small>
                            </p>
                          </label>
                        </div>
                        <div className="col-md-12">
                          <label className={"w-100 mt-4"}>
                            <div className="row">
                              {/* Featured Product */}
                              <div className="col-md-4">
                                <p>Featured Product</p>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isFeatured"
                                    value="1"
                                    checked={input.isFeatured === true}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">
                                    Yes
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isFeatured"
                                    value="0"
                                    checked={input.isFeatured === false}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">No</label>
                                </div>
                              </div>

                              {/* New Product */}
                              <div className="col-md-4">
                                <p>New Product</p>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isNew"
                                    value="1"
                                    checked={input.isNew === true}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">
                                    Yes
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isNew"
                                    value="0"
                                    checked={input.isNew === false}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">No</label>
                                </div>
                              </div>

                              {/* Trending Product */}
                              <div className="col-md-4">
                                <p>Trending Product</p>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isTrending"
                                    value="1"
                                    checked={input.isTrending === true}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">
                                    Yes
                                  </label>
                                </div>
                                <div className="form-check">
                                  <input
                                    className="form-check-input"
                                    type="radio"
                                    name="isTrending"
                                    value="0"
                                    checked={input.isTrending === false}
                                    onChange={handleInput}
                                  />
                                  <label className="form-check-label">No</label>
                                </div>
                              </div>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-12">
                  <label className={"w-100 mt-4"}>
                    <p>Description</p>
                    <Editor
                      editorState={editorState}
                      onEditorStateChange={onEditorStateChange}
                      toolbarClassName={
                        errors.description !== undefined
                          ? "form-control mt-2 is-invalid"
                          : "form-control mt-2"
                      }
                      wrapperClassName="wrapperClassName"
                      editorClassName="editorClassName"
                      placeholder="Enter product description"
                    />
                    <p className="login-error-msg">
                      <small>
                        {errors.description !== undefined
                          ? errors.description[0]
                          : null}
                      </small>
                    </p>
                  </label>
                </div>

                <div className="col-md-12">
                  <div className="row justify-content-center">
                    <div className="col-md-4">
                      <div className="d-grid mt-4">
                        <button
                          className={"btn theme-button"}
                          onClick={handleProductUpdate}
                          dangerouslySetInnerHTML={{
                            __html: isLoading
                              ? '<span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Loading...'
                              : "Update Product",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ProductEdit;
