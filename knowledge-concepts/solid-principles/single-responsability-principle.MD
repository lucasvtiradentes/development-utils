## Single responsability principle (S)

>A class should have one and only one reason to change, meaning that a class should have only one job.

Basicly says that our files should only be responsible for one task, instead of multiple ones.

## Example

The bellow function does two things: says hello AND calculate the birth year.

```javascript
function sayHelloAndShowBirthYear(name, age){
  console.log("Hello ${name}")

  const birthYear = Number((new Date().getYear()) - age)
  console.log(`You were born in ${birthYear}`)
}

sayHelloAndShowBirthYear('Lucas', 25)
```

Based on this principle, it should be modified as it follows:

```javascript
function sayHello(name){
  console.log("Hello ${name}")
}

function showBirthYear(age){
  const birthYear = Number((new Date().getYear()) - age)
  console.log(`You were born in ${birthYear}`)
}

sayHello('Lucas')
showBirthYear(25)
```

## References

- [Solid Principles explained using Typescript | Angular 13 project](https://www.youtube.com/watch?v=bdsQIjn9X8E)
- [SOLID: The First 5 Principles of Object Oriented Design](https://www.digitalocean.com/community/conceptual-articles/s-o-l-i-d-the-first-five-principles-of-object-oriented-design)
