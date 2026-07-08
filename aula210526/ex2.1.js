function cal(C) {
    let F = (C * 1.8) + 32.
    return F
}
let temperaturasFirenehsf = []
const temperaturasCelsius = [0, 20, 30, 35];
temperaturasFirenehsf = temperaturasCelsius.map((temp) => cal(temp))
console.log(temperaturasFirenehsf);