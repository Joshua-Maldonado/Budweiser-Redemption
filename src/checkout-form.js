import React from 'react'



class CheckoutForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = this.initialState()
    this.handlePlaceSelect = this.handlePlaceSelect.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSubmit = this.updateSubmit.bind(this)
    this.triggerCounter = this.triggerCounter.bind(this)
    this.returnButton = this.returnButton.bind(this)
    this.sendOrder = this.sendOrder.bind(this)
    this.updateMetadata = this.updateMetadata.bind(this)
    // this.refreshForm = this.refreshForm.bind(this)
    // this.fireEvent = this.fireEvent.bind(this)
    this.autocomplete = null
  }
  
  

  componentDidMount() {
    this.autocomplete = new window.google.maps.places.Autocomplete(document.getElementById('autocomplete'), {})

    this.autocomplete.addListener("place_changed", this.handlePlaceSelect)
    
    
  }

  initialState() {
    return {
      token_id: this.props.tokenid,
      first_name: '',
      last_name: '',
      email:'',
      phone:'',
      street_address: '',
      apartment: '',
      city: '',
      state: '',
      country: '',
      postcode: '',
      button_status:'disabled',
      googleMapLink: '',
      update_counter: 0
    }
  }

  returnButton = () => {
    this.props.buttonFunction();
  }


    updateSubmit = () => {
       
        var min = 1;
        var max = 100;
        var rand =  min + (Math.random() * (max-min));
        this.setState({['update_counter']: rand})   
    console.log(JSON.stringify(this.state))
    console.log("CHECKING SUBMIT") 
    let btnStatus = true
    
    
    if(this.state.street_address == '' || this.state.city == '' || this.state.country == '' || this.state.postcode == '')
        btnStatus = false


    if(this.state.googleMapLink != '' && this.state.country != '')
        btnStatus = true

    if(this.state.first_name == '' && this.state.last_name == '')
        btnStatus = false
    
    if(this.state.email.includes('@') == false)
        btnStatus = false
    
    if(this.state.phone == '')
        btnStatus = false         

    if( btnStatus == true)
        this.setState({['button_status']: ''})
       
    if( btnStatus == false)
        this.setState({['button_status']: 'disabled'})

  }
  handleChange = event => {
    this.setState({[event.target.name]: event.target.value},
        () => {
            this.updateSubmit()
        })
    
    
    
  }

  triggerCounter = () =>{
    var min = 1;
   var max = 100;
   var rand =  min + (Math.random() * (max-min));
   this.setState({['update_counter']: rand})
   
  
   console.log("Updating SUBMIT: ")
   this.updateSubmit()
  }
  

  handleSubmit(event) {
    event.preventDefault()
    console.log("SUBMIT: "+JSON.stringify(this.state));
    //this.sendOrder();
    //this.updateMetadata();
    this.props.buttonFunction();
  }

//   refreshForm(data){
//     console.log(JSON.stringify(data))
//     let dataObj = {
//         target: {
//             "name": "street_address",
//             "value": `${data.street_address}`
//         }
//     }
//     this.handleChange(dataObj)

//     dataObj = {
//         target: {
//             "name": "city",
//             "value": `${data.city}` 
//         }
//     }
//     this.handleChange(dataObj)

//     dataObj = {
//         target: {
//             "name": "state",
//             "value": data.state
//         }
//     }
//     this.handleChange(dataObj)

//     dataObj = {
//         target: {
//             "name": "country",
//             "value": data.country
//         }
//     }
//     this.handleChange(dataObj)

//     dataObj = {
//         target: {
//             "name": "zip_code",
//             "value": data.zip_code
//         }
//     }
//     this.handleChange(dataObj)

//     dataObj = {
//         target: {
//             "name": "googleMapLink",
//             "value": data.googleMapLink
//         }
//     }
//     this.handleChange(dataObj)

//   }

//   fireEvent(stateGio){
    
//     let dataObj = {
//         target: {
//             "name": "googleMapLink",
//             "value": stateGio
//         }
//     }
//     this.handleChange(dataObj)
   

//   }

  
  handlePlaceSelect = () => {
    
    let addressObject = this.autocomplete.getPlace()
    console.log("Place Data: Length: "+addressObject.address_components.length+ " data : " +JSON.stringify(addressObject))
    let address = addressObject.address_components
    if(address.length >= 8){
    this.setState({
      ['street_address']: `${address[0].long_name} ${address[1].long_name}`})
      
    this.setState({
        ['city']: `${address[3].long_name}`, 
        ['state']: `${address[5].short_name}`,  
        ['country']: `${address[6].short_name}`,
        ['postcode']: `${address[7].short_name}`,
        ['googleMapLink']: `${addressObject.url}`, 
    },
    () => {
        this.updateSubmit()
    })
    var min = 1;
   var max = 100;
   var rand =  min + (Math.random() * (max-min));
   this.setState({['update_counter']: rand})
     this.triggerCounter()
    //this.fireEvent(address[5].short_name)

    // let placeObj = {
    //       'street_address': `${address[0].long_name} ${address[1].long_name}`,
    //       'city': address[3].long_name,
    //       'state': address[5].short_name,
    //       'country': address[6].short_name,
    //       'zip_code': address[7].short_name,
    //       'googleMapLink': addressObject.url
    //     }
    // this.refreshForm(placeObj)
   
    console.log("THIS state: "+JSON.stringify(this.state));
  }
  else if(address.length == 7){
    this.setState({
      ['street_address']: `${address[0].long_name} ${address[1].long_name}`})
      
    this.setState({
        ['city']: `${address[3].long_name}`, 
        ['country']: `${address[5].short_name}`,
        ['postcode']: `${address[6].short_name}`,
        ['googleMapLink']: `${addressObject.url}`, 
    },
    () => {
        this.updateSubmit()
    })
  }
  else {
    this.setState({
      ['googleMapLink']: `${addressObject.url}`
    },
    () => {
        this.updateSubmit()
    })

  }
    
  }


  updateMetadata = async () => {
    console.log("FETCH THIS: "+ "customer: first_name: "+ this.state.first_name + " last_name: "+this.state.last_name + " email: "+this.state.email +"} billing_address: {first_name: "+this.state.first_name+" last_name: "+this.state.last_name+" address1: "+this.state.street_address+" address2: "+this.state.apartment+ " phone: "+this.state.phone+" state: "+this.state.city+" city: "+this.state.city+" country: "+this.state.country+" zip: "+this.state.postcode+"} shipping_address: {first_name: "+this.state.first_name+" last_name: "+this.state.last_name+" address1: "+this.state.street_address+" address2: "+this.state.apartment+" phone: "+this.state.phone+" city: "+this.state.city+" state: "+this.state.city+" country: "+this.state.country+ " zip: "+this.state.postcode+ " }, email: "+this.state.email+" tokenID: "+this.props.tokenid);
    fetch('https://qvgep2eaik.execute-api.us-east-1.amazonaws.com/vbfq_set_physical_claim', {
        method: 'POST',
        body: JSON.stringify({
              "access_key" : "2b9e27bb2Ba1b4a31ad4E00d7a6bd59dF6500b546",
              "token_id" : 1   
      })
       
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            // Handle data
            //this.props.buttonFunction();
         })
         .catch((err) => {
            console.log(err.message);
            console.log("ERROR!");
            
         });
        
       }

  sendOrder = async () => {
    console.log("FETCH THIS: "+ "customer: first_name: "+ this.state.first_name + " last_name: "+this.state.last_name + " email: "+this.state.email +"} billing_address: {first_name: "+this.state.first_name+" last_name: "+this.state.last_name+" address1: "+this.state.street_address+" address2: "+this.state.apartment+ " phone: "+this.state.phone+" state: "+this.state.city+" city: "+this.state.city+" country: "+this.state.country+" zip: "+this.state.postcode+"} shipping_address: {first_name: "+this.state.first_name+" last_name: "+this.state.last_name+" address1: "+this.state.street_address+" address2: "+this.state.apartment+" phone: "+this.state.phone+" city: "+this.state.city+" state: "+this.state.city+" country: "+this.state.country+ " zip: "+this.state.postcode+ " }, email: "+this.state.email+" tokenID: "+this.props.tokenid);
    fetch('https://hooks.zapier.com/hooks/catch/5494090/beccz65/', {
        method: 'POST',
        body: JSON.stringify({
            "order":{"line_items":[{"variant_id":43449120981227,"product_id":7884676661483,"name":"Test Redemption Product","quantity":1}],"customer":{"first_name":this.state.first_name,"last_name":this.state.last_name,"email":this.state.email},"billing_address":{"first_name":this.state.first_name,"last_name":this.state.last_name,"address1":this.state.street_address,"address2":this.state.apartment,"phone":this.state.phone,"state":this.state.state,"city":this.state.city,"country":this.state.country,"zip":this.state.postcode},"shipping_address":{"first_name":this.state.first_name,"last_name":this.state.last_name,"address1":this.state.street_address,"address2":this.state.apartment,"phone":this.state.phone,"city":this.state.city,"state":this.state.state,"country":this.state.country,"zip":this.state.postcode},"email":this.state.email,"tokenID":this.props.tokenid, "mapsLink":this.state.googleMapLink},
        }),
       
      })
         .then((response) => response.json())
         .then((data) => {
            console.log(data);
            // Handle data
            this.updateMetadata();
            
         })
         .catch((err) => {
            console.log(err.message);
            this.props.errorFunction();
         });
        
       }
  



  render() {
    return(
      <div className="form-parent">
        <h1 className="heading mobile">COMPLETE CLAIM</h1>
        <p className="paragraph">Fill out the form below to claim your World Cup Starter Kit. The claim will process once you click the "Complete Claim" button at the end of the form .</p>
        <form className="checkout-form" onSubmit={this.handleSubmit}>
          
            <div className='form-imput-parent'>
              <div className="input-parent first">
                <label htmlFor="first_name" className="">First Name *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input 
                    id='name-input'
                    className='name-input'
                    name={"first_name"}
                    placeholder={"John"}
                    value={this.state.first_name}
                    onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-parent">
                <label htmlFor="last_name" className="">Last Name *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input 
                    className='name-input'
                    name={"last_name"}
                    placeholder={"Doe"}
                    value={this.state.last_name}
                    onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-parent">
              <label htmlFor="email" className="">Email *</label>
              <div className="input-div-parent">
                <div className="input-div">
                  <input 
                    name={"email"}
                    placeholder={"example@domain.com"}
                    value={this.state.email}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="input-parent">
              <label htmlFor="phone" className="">Phone *</label>
              <div className="input-div-parent">
                <div className="input-div">
                  <input 
                    name={"phone"}
                    placeholder={"+1-999-999-9999"}
                    value={this.state.phone}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="input-parent">
              <label htmlFor="street_address" className="">Address</label>
              <div className="input-div-parent">
                <div className="input-div">
                  <input 
                      id="autocomplete"
                      className="input-field"
                      ref="input"
                      type="text"
                    name={"street_address"}
                    value={this.state.street_address}
                    placeholder={"123 Budweiser Place"}
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className='form-imput-parent'>
              <div className="input-parent first">
                <label htmlFor="apartment" className="">Apartment, suite, etc. *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input 
                      name={"apartment"}
                      value={this.state.apartment}
                      placeholder={"#1234"}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-parent">
                <label htmlFor="city" className="">City *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input 
                      name={"city"}
                      value={this.state.city}
                      placeholder={"Hopsville"}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='form-imput-parent'>
              <div className="input-parent first">
                <label htmlFor="state" className="">State *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input
                      name={"state"}
                      id="form-state"
                      value={this.state.state}
                      placeholder={"State"}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
              <div className="input-parent">
                <label htmlFor="postcode" className="">Zip Code *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input 
                      name={"postcode"}
                      value={this.state.postcode}
                      placeholder={"12345"}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="input-parent">
                <label htmlFor="country" className="">Country *</label>
                <div className="input-div-parent">
                  <div className="input-div">
                    <input
                      name={"country"}
                      value={this.state.country}
                      placeholder={"Country"}
                      onChange={this.handleChange}
                    />
                  </div>
                </div>
             </div>
            
            <button onSubmit={this.handleSubmit} disabled={this.state.button_status}>Submit</button>
        </form>
        
      </div>
    )
  }

}

export default CheckoutForm