var Logger = function () {

};

Logger.prototype.debugEnable = false;
Logger.prototype.TTYEcho = true;
/*Console text color codes*/
Logger.prototype.reset = '\033[0m';
Logger.prototype.bold = '\033[1m';
Logger.prototype.italic = '\033[3m';
Logger.prototype.underline = '\033[4m';
Logger.prototype.blink = '\033[5m';
Logger.prototype.black = '\033[30m';
Logger.prototype.red = '\033[31m';
Logger.prototype.green = '\033[32m';
Logger.prototype.yellow = '\033[33m';
Logger.prototype.blue = '\033[34m';
Logger.prototype.magenta = '\033[35m';
Logger.prototype.cyan = '\033[36m';
Logger.prototype.white = '\033[37m';

/*Timestamp constants*/
Logger.prototype.dateDelim = '/';
Logger.prototype.timeDelim = ':';

Logger.prototype.DebugEnable = function (boo) {
    this.info("LOGGER DEBUGGING is now " + (boo ? "ON" : "OFF"));
    this.debugEnable = boo;
};
Logger.prototype.TTYEchoEnable = function (boo) {
    this.info("LOGGER TTY echo is now " + (boo ? "ON" : "OFF"));
    this.TTYEcho = boo;
};

/*log
 *writes a line to the console with a timestamp;
 */
Logger.prototype.log = function (data, hidden) {
    if (!hidden) //If hidden argument is passed, don't display in console.
        console.log(this.getTimeStamp() + data);
    //Log to text file regardless.
};
/*getTimeStamp
 *builds the current time in a string format
 */
Logger.prototype.getTimeStamp = function () {
    var now = new Date(), year, month, day, hour, minute, second;
    //Set Values
    year = now.getFullYear().toString().substr(2);
    month = this.padZero(now.getMonth() + 1);
    day = this.padZero(now.getDate());
    hour = this.padZero(now.getHours());
    minute = this.padZero(now.getMinutes());
    second = this.padZero(now.getSeconds());
    //Build time string
    return year + this.dateDelim + month + this.dateDelim + day + " " +
        hour + this.timeDelim + minute + this.timeDelim + second
};
/*padZero
 * val - number
 * returns 0+number if less than 9, number otherwise
 */
Logger.prototype.padZero = function (val) {
    return val <= 9 ? '0' + val : val;
};
/*info
 * writes an info string to the console
 */
Logger.prototype.info = function (data) {
    this.log(this.cyan + "[info ] " + this.reset + data);
};
/*debug
 * writes a debug message to the console if enabled
 */
Logger.prototype.debug = function (data) {
    if (this.debugEnable)
        this.log(this.green + "[DEBUG] " + this.reset + data);
};
/*warn
 * writes a warning string to the console
 */
Logger.prototype.warn = function (data) {
    this.log(this.yellow + "[Warn ] " + this.reset + data);
};
/*Err
 * writes an error string to the console
 */
Logger.prototype.err = function (data) {
    this.log(this.red + "[ERROR] " + this.reset + data);
};
/*tty
 * writes tty input to the log.
 */
Logger.prototype.tty = function (data) {
    this.log(this.magenta + "[STDIN] " + data + this.reset, !this.TTYEcho);
};
/*export the Logger object */
exports.Logger = Logger;
