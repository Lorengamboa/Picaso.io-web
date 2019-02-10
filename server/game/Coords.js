function Coords(x, y)
{
    this.x = x;
    this.y = y;
}
{
    Coords.prototype.add = function(other)
    {
        this.x += other.x;
        this.y += other.y;
        return this;
    }
 
    Coords.prototype.clone = function()
    {
        return new Coords(this.x, this.y);
    }
 
    Coords.prototype.isInRange = function(max)
    {
        var returnValue = 
        (
            this.x >= 0 
            && this.x <= max.x
            && this.y >= 0 
            && this.y <= max.y
        );
        return returnValue;
    }
 
    Coords.prototype.overwriteWith = function(other)
    {
        this.x = other.x;
        this.y = other.y;
        return this;
    }
 
    Coords.prototype.subtract = function(other)
    {
        this.x -= other.x;
        this.y -= other.y;
        return this;
    }
}
 
module.exports = Coords;