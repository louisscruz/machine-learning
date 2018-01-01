# Linear Regression

Linear regression solves supervised learning problems.

## Model Representation

| Symbol | Meaning |
| ------ | ------- |
| `m`    | The number of training examples |
| `x`    | The input variable |
| `y`    | The output variable |
| `(x^i, y^i)` | The `i`th training example |

The training set is fed to the learning algorithm, and that outputs a hypothesis `h`.
The hypothesis is a function that will take an input and return an estimation.

This kind of linear regression is called univariate linear regression.

## Cost Function

Any given hypothesis takes the form: `h~theta(x) = theta~0 + theta~1(x)`.

Theta zero and one are the parameter values.
The goal in linear regression is to choose two values of theta that corresponds to a good fitting of the training set data.

The goal is to minimize theta~0 and theta~1 such that the following is minimized: `(h~theta(x) - y)^2`
Essentially, the hypothesis function should have as little difference with the actual outputs as possible.

Actually, we want to perform this for each input of our training set.
So, we actually are looking to minimize `sum~(i=1, m)(h~theta(x^i) - y^i)^2`.

In order to find the average, and in order to make later math a bit easier, we actually need to throw `1/2m` in front of our summation like so: `(1/2m)(sum~(i=1, m)(h~theta(x^i) - y^i)^2)`.

The cost function is the minimization of the thetas.
It is also sometimes called the squared error function.

### Intuition I

For the training set of `{(1, 1), (2, 2), (3, 3)}`, let us set `h~theta(x)` to equal `theta~1(x)`.
Assume that we set `theta~1` to equal `1`.
This allows for a slope that passes through all of the data perfectly.

In this case, the cost function `J(theta~1)` is equal to:

```
J(1) = (1/2m)(sum~(i=1, m)(h~theta(x^i) - y^i)^2)
= (1/2m)(sum~(i=1, m)(theta~1(x^i) - y^i)^2)
= (1/2m)(0^2 + 0^2 + 0^2)
= (1/6)(0)
= 0
```

If we had chosen `h~theta(x)` to equal `0.5`, then we would get the following for `J(theta~1)`:

```
J(0.5) = (1/2m)(sum~(i=1, m)(h~theta(x^i) - y^i)^2)
= (1/2m)(sum~(i=1, m)(theta~1(x^i) - y^i)^2)
= (1/2m)((0.5 - 1)^2 + (1 - 2)^2 + (1.5 - 3)^2)
= (1/6)(3.5)
= ((3.5)/6))
=~ 0.58
```

If we had chosen `h~theta(x)` to equal `0`, then we would get the following for `J(theta~1)`:

```
J(0) = (1/2m)(sum~(i=1, m)(h~theta(x^i) - y^i)^2)
= (1/2m)(sum~(i=1, m)(theta~1(x^i) - y^i)^2)
= (1/2m)((0 - 1)^2 + (0 - 2)^2 + (0 - 3)^2)
= (1/6)(14)
= (14/6)
= (7/3)
```

A graph of these values of `J(theta~1)` shows that `theta~1=1` produces the minimum.

### Intuition II

We so far have only looked into `J(theta~1)`.
However, we will actually need to to calculate `J(theta~0, theta~1)`.
Doing so will produce a three dimensional graph, where the axes represent the value of the cost function, and the values of the thetas.
To simplify this, contour plots will be used to demonstrate the fitting of the data.

The goal of the next section is to find an algorithm that will automatically find the minimum for us.

## Gradient Descent

This is a general algorithm that finds the minimum for `J(theta~0, theta~1,..., theta~n)` for any `n`.
In this case, the focus will be on two thetas.

Gradient descent starts with an initial value and makes adjustments until a minimum is found.
Basically, you step downhill until you reach a convergence.

```
repeat until convergence {
  theta~j:=theta~j - alpha((del/del(theta~j))(J(theta~0, theta~1)) for j = 0 and j = 1
}
```

In this equation, `alpha` is the learning rate.
It basically represents how large the downhill steps are.
A high number indicates aggressive learning.

The thetas must be updated simultaneously, otherwise the values in the assignment will not be calculated correctly.

### Intuition

The use of the derivative term is what allows for movements in the correct direction.

In `theta~j:=theta~j - alpha((del/del(theta~j))(J(theta~0, theta~1))`, if the derivative is a positive slope, then a move to the left will be made.
Otherwise, a move to the right will be made.

If `alpha` is too small, then the descent can be very slow.
However, if it is too large, then it can overshoot the minimum, fail to converge, or even diverge.

If it happens to be that `theta-1` is initialized at a local minimum, then it will not be re-assigned.

Even with a fixed learning rate, the moves will become smaller and smaller as descent down a slope occurs.

### Gradient Descent for Linear Regression

The goal is to minimize `(theta-0, theta-1)` of `J(theta-0, theta-1)`.

That means we are looking for the following:

```
(del/del(theta~j))(J(theta~0, theta~1)
= (del/del(theta-j))((1/2m)(sum~(i=1,m)(h~theta(x^i) - y^i)^2))
= (del/del(theta-j))((1/2m)(sum~(i=1,m)(theta~0 + theta~1(x^i) - y^i)^2)
```

The partial derivative has to be known for `j=0` and `j=1`.

In the first case, the partial derivative is `(1/m)(sum~(i=1,m)(h~theta(x^i) - y^i))`.
In the second case, the partial derivative is `(1/m)(sum~(i=1,m)(h~theta(x^i) - y^i)) * x^i`.

The gradient descent algorithm is then as follows:

```
repeat until convergence {
  theta~0 := theta~0 - alpha(1/m)(sum~(i=1,m)(h~theta(x^i) - y^i))
  theta~1 := theta~1 - alpha(1/m)(sum~(i=1,m)(h~theta(x^i) - y^i) * x^i)
}
```

Fortunately, in the case of linear regression, all cost functions will be context, meaning that they will be bowl shaped.
This means that the resulting function is a global minimum.

Because this type of gradient descent calculates the difference with all data points, it is called batch gradient descent.
There are other version of gradient descent that look only at a subset of the data points.
