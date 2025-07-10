from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
from typing import List, Optional, Dict
from datetime import datetime

app = FastAPI(title="TastyBites")

# CORS Setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-Memory Database
customers_db: List[Dict] = []
orders_db: List[Dict] = []

# Helper function to check for duplicates
def customer_exists(first_name: str, surname: str) -> bool:
    """Check if customer with same first and last name already exists"""
    return any(
        c["first_name"].lower() == first_name.lower() and 
        c["surname"].lower() == surname.lower()
        for c in customers_db
    )

# Data Models (unchanged)
class CustomerBase(BaseModel):
    first_name: str
    surname: str
    middle_name: Optional[str] = None
    date_of_birth: Optional[str] = None
    home_address: Optional[str] = None

class CustomerCreate(CustomerBase):
    date_of_registration: str = datetime.now().strftime("%Y-%m-%d")
    developer_honor: bool = True  # Your _24120111119 flag

class Customer(CustomerCreate):
    id: int

class OrderBase(BaseModel):
    order_date: str
    menu_item: str
    special_instructions: Optional[str] = None
    payment_method: str
    next_reservation_date: Optional[str] = None

# Custom Root Endpoint (unchanged)
@app.get("/", response_class=HTMLResponse)
def read_root():
    return """
    <html>
        <head>
            <title>TastyBites</title>
            <style>
                body { 
                    font-family: Arial, sans-serif; 
                    text-align: center; 
                    margin-top: 100px;
                    background-color: #FFF8F0;
                }
                h1 { 
                    color: #FF8C00; 
                    font-size: 3em;
                }
                a {
                    color: #E67E00;
                    text-decoration: none;
                    font-weight: bold;
                    border: 2px solid #FF8C00;
                    padding: 10px 20px;
                    border-radius: 5px;
                    transition: all 0.3s;
                }
                a:hover {
                    background-color: #FF8C00;
                    color: white;
                }
            </style>
        </head>
        <body>
            <h1>Welcome to TastyBites</h1>
            <p>Visit <a href="/docs">/docs</a> for API documentation</p>
        </body>
    </html>
    """

# Updated Customer Endpoints
@app.post("/customers/", response_model=Customer, status_code=201)
def create_customer(customer: CustomerCreate):
    # Check for duplicates before adding
    if customer_exists(customer.first_name, customer.surname):
        raise HTTPException(
            status_code=400,
            detail=f"Customer {customer.first_name} {customer.surname} already exists"
        )
    
    customer_data = customer.model_dump()
    customer_data["id"] = len(customers_db) + 1
    customers_db.append(customer_data)
    return customer_data

@app.get("/customers/", response_model=List[Customer])
def get_customers():
    # Return unique customers (case-insensitive)
    seen = set()
    unique_customers = []
    for c in customers_db:
        key = (c["first_name"].lower(), c["surname"].lower())
        if key not in seen:
            seen.add(key)
            unique_customers.append(c)
    return unique_customers

@app.get("/customers/{customer_id}", response_model=Customer)
def get_customer(customer_id: int):
    try:
        return next(c for c in customers_db if c["id"] == customer_id)
    except StopIteration:
        raise HTTPException(status_code=404, detail="Customer not found")

@app.put("/customers/{customer_id}", response_model=Customer)
def update_customer(customer_id: int, customer: CustomerBase):
    try:
        index = next(i for i, c in enumerate(customers_db) if c["id"] == customer_id)
        # Check if update would create a duplicate
        if (customer.first_name.lower() != customers_db[index]["first_name"].lower() or 
            customer.surname.lower() != customers_db[index]["surname"].lower()):
            if customer_exists(customer.first_name, customer.surname):
                raise HTTPException(
                    status_code=400,
                    detail="Another customer already exists with this name"
                )
        customers_db[index].update(customer.dict())
        return customers_db[index]
    except StopIteration:
        raise HTTPException(status_code=404, detail="Customer not found")

# Delete and Order endpoints remain unchanged
@app.delete("/customers/{customer_id}")
def delete_customer(customer_id: int):
    global customers_db
    customers_db = [c for c in customers_db if c["id"] != customer_id]
    return {"message": "Customer deleted"}

@app.post("/orders/", status_code=201)
def create_order(order: OrderBase, customer_id: int):
    order_data = order.model_dump()
    order_data["id"] = len(orders_db) + 1
    order_data["customer_id"] = customer_id
    orders_db.append(order_data)
    return order_data

@app.get("/orders/")
def get_orders():
    return orders_db