import { userService } from "../services/index.js";

const userActions = {
  login,
  getJogs,
  addJog,
  editJog,
  getDate,
  parseDate
};

function login() {
  return userService.login().then(
    user => {
      console.log(user);
    },
    error => {
      // dispatch(failure(error));
      // dispatch(alertActions.error(error));
    }
  );
}

function getJogs() {
  return userService.getJogs().then(
    response => {
      console.log(response);
      return response.jogs;
    },
    error => {
      // console.log("Error");
    }
  );
}

function addJog(jog) {
  return userService.addJog(jog).then(
    response => {
      console.log(response);
      return response;
    },
    error => {
      // console.log("Error");
    }
  );
}

function editJog(jog) {
  return userService.editJog(jog).then(
    response => {
      console.log(response);
      return response;
    },
    error => {
      // console.log("Error");
    }
  );
}

function getDate(seconds, parseToObject) {
  const date = new Date(Date.parse(seconds));
  if (!isNaN(seconds)) date.setTime(seconds * 1000);

  if (!parseToObject) {
    return {
      day: date.getUTCDate() + 1,
      month: date.getMonth() + 1,
      year: date.getFullYear()
    };
  } else {
    
    return date.getUTCDate() + '.' + (date.getUTCMonth() + 1) + '.' +  date.getFullYear();
  }
}

function parseDate(date) {
    if (date && !isNaN(date)) {
        let parsedDate = new Date(date * 1000);
        return zeroPad(parsedDate.getDate(), 2) + '.' + zeroPad(parsedDate.getMonth() + 1, 2) + '.' + zeroPad(parsedDate.getFullYear(), 4);
    }
    if( !date.match(/^\d{2}[./-]\d{2}[./-]\d{4}$/) ) return null;

    let parts = date.split('.').map(num => parseInt(num)).reverse();
    return new Date('01.01.1970 00:00:00').setFullYear(parts[0], parts[1], parts[2]);
      
}

  function zeroPad(num, places) {
    var zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
  }

export default userActions;
