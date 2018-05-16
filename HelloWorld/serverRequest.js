export default {
    serverLogin(email, password) {
        return fetch('https://tq-template-server-sample.herokuapp.com/authenticate', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            password: password,
            rememberMe: false
          }),
        }).then((response) => {
            return(response.json());
        }).then((responseJson) => {
            console.log('responseJson', responseJson)
            return(responseJson);
        }).catch((error) => {
          console.log(error);
          return responseJson.data.errors;
        });
    },

    serverPost() {
        fetch('https://tq-template-server-sample.herokuapp.com/users', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              role: this.setRole()
            }),
          }).then((response) => {
              return(response.json());
          })
              .then((responseJson) => {
                if(responseJson.errors[0].name === 'EmailError') {
                  this.onSuccess()
                }
                else this.onError(responseJson.errors[0].original);
              })
              .catch((error) => {
                console.log(error);
              });
    },

    serverPut() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+this.userId, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              Authorization: this.token,
            },
            body: JSON.stringify({
              email: this.state.email,
              password: this.state.password,
              name: this.state.name,
              role: this.setRole()
            }),
          }).then((response) => {
              return(response.json());
          })
              .then((responseJson) => {
                if(responseJson.data) {
                  this.onSuccess()
                }
                else this.onError(responseJson.errors[0].original);
              })
              .catch((error) => {
                console.log(error);
              });
    },

    getUserDetail() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+JSON.stringify(this.userId), {
            method: 'GET',
            headers: {
              Authorization: this.responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserDetail) => {
            if(responseUserDetail.data) {
              this.setState({data: responseUserDetail.data});
            }
            else {
                alert(responseUserDetail.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    },

    deleteUser() {
        fetch('https://tq-template-server-sample.herokuapp.com/users/'+JSON.stringify(this.userId), {
            method: 'DELETE',
            headers: {
              Authorization: this.responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserDeletion) => {
            if(responseUserDeletion.data) {
                alert('User Deleted');
                Events.publish('UsersListChanged')
                this.props.navigation.goBack();
            }
            else {
                alert(responseUserDetail.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    },

    getUsersList(responseJson) {
        fetch('https://tq-template-server-sample.herokuapp.com/users?pagination={"page":0 , "window":100}', {
            method: 'GET',
            headers: {
              Authorization: responseJson.data.token,
            }
        }).then((response) => {
            return(response.json());
        }).then((responseUserList) => {
            if(responseUserList.data) {
              this.setState({data: responseUserList.data});
            }
            else {
                alert(responseUserList.errors[0].message);
                this.props.navigation.goBack();
                return null
            }
        })
        .catch((error) => {
            console.log(error);
            return null
        });
    }
}