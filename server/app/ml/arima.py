"""
from statsmodels.tsa.arima.model import ARIMA
import numpy as np
from sklearn.metrics import mean_absolute_error, root_mean_squared_error

def predict_arima(values, n_predictions=5, order=(1, 1, 1)):
    if len(values) < (order[0] + order[2] + 1):
        raise ValueError("No hay suficientes datos para entrenar el modelo ARIMA.")
    
    model = ARIMA(values, order=order)
    model_fit = model.fit()

    # Predicciones futuras
    forecast = model_fit.forecast(steps=n_predictions)

    # Métricas sobre los valores ajustados
    fitted_values = model_fit.fittedvalues
    min_len = min(len(fitted_values), len(values))

    reales = np.array(values[-min_len:])
    estimados = np.array(fitted_values[-min_len:])

    mae = mean_absolute_error(reales, estimados)
    rmse = root_mean_squared_error(reales, estimados)
    mape = np.mean(np.abs((reales - estimados) / reales)) * 100

    return {
        "predictions": forecast.tolist(),
        "mae": mae,
        "rmse": rmse,
        "mape": mape
    }

"""

from statsmodels.tsa.arima.model import ARIMA
from pmdarima import auto_arima
import numpy as np
from sklearn.metrics import mean_absolute_error, root_mean_squared_error

def predict_arima(values, n_predictions=5):
    if len(values) < 10:  # mínimo recomendado para auto_arima
        raise ValueError("No hay suficientes datos para entrenar el modelo ARIMA.")

    # Encontrar automáticamente el mejor orden (p,d,q)
    auto_model = auto_arima(values, seasonal=False, stepwise=True, suppress_warnings=True, error_action='ignore')
    best_order = auto_model.order

    # Entrenar modelo ARIMA con los mejores parámetros encontrados
    model = ARIMA(values, order=best_order)
    model_fit = model.fit()

    # Predicciones futuras
    forecast = model_fit.forecast(steps=n_predictions)

    # Métricas sobre los valores ajustados
    fitted_values = model_fit.fittedvalues
    min_len = min(len(fitted_values), len(values))

    reales = np.array(values[-min_len:])
    estimados = np.array(fitted_values[-min_len:])

    mae = mean_absolute_error(reales, estimados)
    rmse = root_mean_squared_error(reales, estimados)
    mape = np.mean(np.abs((reales - estimados) / reales)) * 100

    return {
        "predictions": forecast.tolist(),
        "mae": mae,
        "rmse": rmse,
        "mape": mape,
        "order": best_order  # Incluimos el orden óptimo para fines de análisis
    }

"""
import warnings
warnings.filterwarnings("ignore", category=FutureWarning)
from pmdarima import auto_arima
import numpy as np
from sklearn.metrics import mean_absolute_error, mean_squared_error

def root_mean_squared_error(y_true, y_pred):
    return np.sqrt(mean_squared_error(y_true, y_pred))

def predict_arima(values, n_predictions=5):
    if len(values) < 10:
        raise ValueError("No hay suficientes datos para entrenar el modelo ARIMA.")

    # Entrenamos el modelo auto_arima
    model = auto_arima(
        values,
        seasonal=False,
        stepwise=True,
        suppress_warnings=True,
        error_action='ignore',
        trace=False
    )

    # Predicciones futuras
    forecast = model.predict(n_periods=n_predictions)

    # Valores ajustados (in-sample predictions)
    fitted_values = model.predict_in_sample()

    min_len = min(len(fitted_values), len(values))
    reales = np.array(values[-min_len:])
    estimados = np.array(fitted_values[-min_len:])

    # Métricas
    mae = mean_absolute_error(reales, estimados)
    rmse = root_mean_squared_error(reales, estimados)
    mape = np.mean(np.abs((reales - estimados) / reales)) * 100

    return {
        "predictions": forecast.tolist(),
        "mae": mae,
        "rmse": rmse,
        "mape": mape,
        "order": model.order
    }
    """
