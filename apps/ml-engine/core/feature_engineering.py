def calculate_qsofa(sys_bp: float, resp_rate: float) -> int:
    """Calculates partial qSOFA score based on vitals."""
    score = 0
    if sys_bp <= 100: score += 1
    if resp_rate >= 22: score += 1
    return score

def extract_features(features) -> list:
    """Normalizes and prepares raw clinical data for model inference."""
    qsofa = calculate_qsofa(features.sys_bp, features.resp_rate)
    return [
        features.heart_rate,
        features.sys_bp,
        features.temp_celsius,
        features.resp_rate,
        features.wbc_count,
        features.age,
        qsofa
    ]
